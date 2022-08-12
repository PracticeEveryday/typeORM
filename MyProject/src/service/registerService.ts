import { UserModel } from "./../db/models/user";

const userModel = new UserModel();
export class RegisterService {
  public async create(email: string, password: string, name: string) {
    const user = await userModel.create(email, password, name);
    return user;
  }
}
