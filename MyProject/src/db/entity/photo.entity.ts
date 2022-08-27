import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { UserEntity } from "./user.entity";

import { IUser, IPhoto } from "../../types";

@Entity("photo")
export class PhotoEntity extends BaseEntity implements IPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @CreateDateColumn({ name: "create_dt", type: "timestamptz", nullable: false })
  create_dt: Date;

  // 수정일
  @UpdateDateColumn({ name: "update_dt", type: "timestamptz", nullable: false })
  update_dt: Date;

  @ManyToOne((type) => UserEntity, (UserEntity) => UserEntity.photos)
  user_id: IUser;
}
