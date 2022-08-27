import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { UserEntity } from "./user.entity";

import { IProfile } from "../../models/interface/IProfileService";
import { IUser } from "../../models/interface/IUserService";

@Entity("profile")
export class ProfileEntity extends BaseEntity implements IProfile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "subject", type: "varchar", unique: true, nullable: false })
  subject: string;

  @Column({ name: "description", type: "varchar", nullable: false })
  description: string;

  @CreateDateColumn({ name: "create_dt", type: "timestamptz", nullable: false })
  create_dt: Date;

  // 수정일
  @UpdateDateColumn({ name: "update_dt", type: "timestamptz", nullable: false })
  update_dt: Date;

  @OneToOne((type) => UserEntity, (UserEntity) => UserEntity.profile)
  @JoinColumn()
  user_id: IUser;
}
