import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  EDITOR = "editor",
  VIEWER = "viewer",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  "id": number;

  @Index()
  @Column({ type: "varchar", length: 50, unique: true })
  "username": string;

  @Index()
  @Column({ type: "varchar", length: 100, unique: true })
  "email": string;

  @Column({ name: "password_hash", type: "varchar", length: 255 })
  "passwordHash": string;

  @Column({ name: "first_name", type: "varchar", length: 50 })
  "firstName": string;

  @Column({ name: "last_name", type: "varchar", length: 50 })
  "lastName": string;

  @Index()
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.EDITOR,
  })
  "role": UserRole;

  @Column({ name: "is_active", type: "boolean", default: true })
  "isActive": boolean;

  @Column({ name: "last_login", type: "timestamp", nullable: true })
  "lastLogin": Date | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  "createdAt": Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  "updatedAt": Date;
}
