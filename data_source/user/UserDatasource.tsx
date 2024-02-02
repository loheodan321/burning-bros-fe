import { UserDataModel } from "@/models/user/User";
import SlackHttp from "../http/Http";

class UserDatasource {
  constructor(private http: SlackHttp) {}

  public async getUser() {
    const response = await this.http.instance.get("/users");
    const newData = response.data?.map((item: any) => {
      const { id, name, phone } = item;

      const user = UserDataModel.parse({ id, name, phone });
      return user;
    });

    response.data = newData;

    return response;
  }
}

export default UserDatasource;
