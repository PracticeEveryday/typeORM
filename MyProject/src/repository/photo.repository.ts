import { MyDataSource } from "../db/data-source";

import { Repository } from "typeorm";
import { PhotoEntity } from "../db/entity/photo.entity";

export interface PhotoRepository extends Repository<PhotoEntity> {}
