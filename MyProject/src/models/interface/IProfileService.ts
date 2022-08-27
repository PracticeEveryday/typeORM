import { IUser } from "./IUserService";

export interface IProfile {
  id: string;
  subject: string;
  description: string;
  create_dt: Date;
  update_dt: Date;
  user_id: IUser;
}

export interface IProfileService {
  createProfile(
    user_id: string,
    subject: string,
    description: string
  ): Promise<IProfile>;
}
