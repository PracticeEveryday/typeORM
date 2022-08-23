import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { ProfileEntity } from "./profile.entity";

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

  @OneToOne((type) => ProfileEntity, (ProfileEntity) => ProfileEntity.user_id)
  profile: ProfileEntity;
}
