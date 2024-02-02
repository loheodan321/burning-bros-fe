import { isNil } from "lodash";

export class LocalAuthDataSource {
  protected TOKEN_KEY = "token";
  constructor(private storageInstance = localStorage) {}

  get token(): string | null {
    return this.storageInstance.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated(): boolean {
    return !isNil(this.storageInstance.getItem(this.TOKEN_KEY));
  }

  public setToken(token: string) {
    this.storageInstance.setItem(this.TOKEN_KEY, token);
  }
}
