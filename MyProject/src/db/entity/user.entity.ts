import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
