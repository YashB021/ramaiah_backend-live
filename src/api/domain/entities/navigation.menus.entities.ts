import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { NavigationItem } from "./navigation.items.entities";

@Entity("navigation_menus")
export class NavigationMenu {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({ type: "varchar", length: 100 })
  "name": string;

  @Column({ type: "varchar", length: 60 })
  "slug": string;

  @Column({
    type: "enum",
    enum: ["header", "footer", "sidebar", "mobile"],
  })
  "location": "header" | "footer" | "sidebar" | "mobile";

  @Column({ type: "boolean", default: true })
  "is_active": boolean;

  @CreateDateColumn({ type: "timestamp" })
  "created_at": Date;

  @UpdateDateColumn({ type: "timestamp" })
  "updated_at": Date;

  // ✅ Relationships
  @OneToMany(() => NavigationItem, (item) => item.menu)
  "items": NavigationItem[];
}