import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { PhotoEntity } from "./photo.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "email", unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn({ name: "create_dt", type: "timestamptz", nullable: false })
  create_dt: Date;

  // 수정일
  @UpdateDateColumn({ name: "update_dt", type: "timestamptz", nullable: false })
  update_dt: Date;

  @OneToOne((type) => ProfileEntity, (ProfileEntity) => ProfileEntity.user_id)
  profile: ProfileEntity;

  @OneToMany((type) => PhotoEntity, (PhotoEntity) => PhotoEntity.user_id)
  photos: PhotoEntity[];
}
