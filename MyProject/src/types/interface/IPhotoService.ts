import { IUser } from "..";

export interface IPhoto {
  id: number;
  url: string;
  create_dt: Date;
  update_dt: Date;
  user_id: IUser;
}

export interface IPhotoService {
  createPhoto(user_id: string, url: string): Promise<IPhoto>;
}
