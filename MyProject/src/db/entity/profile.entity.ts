import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("profile")
export class ProfileEntity {
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
  user_id: UserEntity;
}
