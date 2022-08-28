import { Container } from "typedi";
import { PhotoService } from "../../service/photo.service";
import { ProfileService } from "../../service/profile.service";
import { UserService } from "../../service/user.service";

export const dependencies = () => {
  Container.set("userService", UserService);
  Container.set("profileService", ProfileService);
  Container.set("photoService", PhotoService);
};
