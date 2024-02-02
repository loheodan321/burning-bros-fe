import { AxiosError } from "axios";
import { get, isString, isObject, reduce } from "lodash";
import { match, Pattern } from "ts-pattern";

export enum ExceptionType {
  unknown = "unknown",
  invalid_auth_credential = "invalid_auth_credential",
  server = "server",
  serialize = "serialize",
  update_table_rows = "updateRows",
}

type ExceptionSealed =
  | string
  | { type: ExceptionType.unknown }
  | { type: ExceptionType.invalid_auth_credential }
  | { type: ExceptionType.server; detail?: string; code?: number }
  | { type: ExceptionType.serialize; detail: string }
  | { type: ExceptionType.update_table_rows; ids: string[] };

export class Exception extends Error {
  constructor(public type: ExceptionSealed) {
    super();
  }

  private static invalid_auth_credential_message =
    "Unable to log in with provided credentials.";

  static parse(e: any): Exception {
    let exception: ExceptionSealed = { type: ExceptionType.unknown };
    if (e instanceof Exception) return e;
    if (get(e, "isAxiosError")) {
      const responseData = get(e, "response.data");
      if (responseData) {
        const error = isString(responseData)
          ? responseData
          : isObject(responseData)
          ? reduce(
              responseData,
              (result, value, key) => {
                return result + `${key}: ${value}\n`;
              },
              ""
            )
          : undefined;

        if (error === Exception.invalid_auth_credential_message)
          exception = { type: ExceptionType.invalid_auth_credential };
        else if (error) {
          exception = {
            type: ExceptionType.server,
            detail: error,
            code: e.code,
          };
        }
      } else {
        exception = {
          type: ExceptionType.server,
          code: (e as AxiosError).response?.status,
        };
      }
    }
    return new Exception(exception);
  }

  get meaning(): string {
    return match(this.type)
      .with({ type: ExceptionType.unknown }, (_) => "Something wrong")
      .with(
        { type: ExceptionType.invalid_auth_credential },
        (_) => "Unable to log in with provided credentials."
      )
      .with({ type: ExceptionType.server }, ({ detail, code }) => {
        return detail || `Server encountered problem [${code}]`;
      })
      .with(
        { type: ExceptionType.serialize },
        ({ detail }) => `Data has invalid format:\n${detail}`
      )
      .with({ type: ExceptionType.update_table_rows }, ({ ids }) =>
        [
          `Failed to update ${ids.length} records:`,
          ...ids.map((id) => `id: ${id}`),
        ].join("\n")
      )
      .with(Pattern.string, (message) => {
        return message;
      })
      .exhaustive();
  }
}
