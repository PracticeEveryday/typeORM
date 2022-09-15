import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { PhotoEntity } from "./photo.entity";

import { IUser } from "../../types";

@Entity("user")
export class UserEntity extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "email", unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn({ name: "create_dt", type: "timestamptz", nullable: false })
  create_dt: Date;

  // 수정일
  @UpdateDateColumn({ name: "update_dt", type: "timestamptz", nullable: false })
  update_dt: Date;

  @OneToOne((type) => ProfileEntity, (ProfileEntity) => ProfileEntity.user_id)
  profile;

  @OneToMany((type) => PhotoEntity, (PhotoEntity) => PhotoEntity.user_id)
  photos;
}
