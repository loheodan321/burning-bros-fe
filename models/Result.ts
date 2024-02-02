import { Exception } from "./Exception";

export enum ResultState {
  success = "success",
  failed = "error",
}

export type Result<T> =
  | { state: ResultState.success; data: T }
  | { state: ResultState.failed; exception: Exception };

export const resultGuard = async <T>(
  fn: () => Promise<T>
): Promise<Result<T>> => {
  try {
    const data = await fn();
    return { state: ResultState.success, data };
  } catch (e) {
    return { state: ResultState.failed, exception: Exception.parse(e) };
  }
};
