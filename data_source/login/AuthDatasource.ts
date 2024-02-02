import SlackHttp from "../http/Http";
import { LocalAuthDataSource } from "../http/LocalAuth";

export class AuthDatasource {
  constructor(
    private http: SlackHttp,
    private localAuth: LocalAuthDataSource
  ) {}

  public async login(props: { username: string; password: string }) {
    const response = await this.http.instance.get("/posts");
    const token = Math.random().toString + " token";
    this.localAuth.setToken(token);

    return response;
  }
}
