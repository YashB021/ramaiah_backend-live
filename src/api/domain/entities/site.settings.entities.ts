import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum SettingType {
  TEXT = "text",
  NUMBER = "number",
  BOOLEAN = "boolean",
  JSON = "json",
  FILE = "file",
}

export enum HeaderLevel {
  LEVEL_ONE = "level_one",
  LEVEL_TWO = "level_two"
}

@Entity({ name: "site_settings" })
export class SiteSetting {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({name:"setting_key", type: "varchar", length: 100, unique: true })
  @Index("idx_setting_key")
  "setting_key": string;

  @Column({name:"setting_value", type: "text", nullable: true })
  "setting_value": string;

  @Column({
    name:"setting_type",
    type: "enum",
    enum: SettingType,
    default: SettingType.TEXT,
  })
  "setting_type": SettingType;

  @Column({
    type: "enum",
    enum: HeaderLevel,
    default: HeaderLevel.LEVEL_ONE,
  })
  @Index("idx_header_level")
  "header_level": HeaderLevel;

  @Column({ type: "text", nullable: true })
  "description": string;

  @Column({ type: "boolean", default: true })
  @Index("idx_is_public")
  "is_public": boolean;

  @Column({type:"boolean", default: true})
  "status": boolean;
  
  @CreateDateColumn({ type: "timestamp" })
  "created_at": Date;

  @UpdateDateColumn({ type: "timestamp" })
  "updated_at": Date;

  @Column({ type: "timestamp", nullable: true })
  "deleted_at": Date | null;
}
