import { PhotoEntity } from "../db/entity/photo.entity";
import { PhotoRepository } from "../repository/photo.repository";

import { HttpException } from "../setting/exception/httpException";
import { MyDataSource } from "../db/data-source";

export class PhotoService {
  private photoRepository: PhotoRepository;

  constructor() {
    this.photoRepository = MyDataSource.getRepository("photo");
  }

  public createPhoto = async (user_id, url) => {
    const newPhoto = this.photoRepository.save({
      user_id,
      url,
    });
    return newPhoto;
  };
}
