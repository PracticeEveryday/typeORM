import { Container } from "typedi";
import { UserService } from "../../service/user.service";

export const dependencies = () => {
  Container.set("userService", UserService);
};
