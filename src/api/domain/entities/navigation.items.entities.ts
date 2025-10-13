import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Page } from "./pages.entities";
import { NavigationMenu } from "./navigation.menus.entities";
import { Specialty } from "./specialties.entities";
import { NavigationItemPage } from "./navigation.item.category.entities";


@Entity("navigation_items")
export class NavigationItem {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "menu_id": number;

  @Column({ nullable: true })
  "parent_id": number | null;

  @Column({ type: "varchar", length: 100 })
  "title": string;

  @Column({ type: "varchar", length: 500, nullable: true })
  "slug": string | null;

  @Column({ nullable: true })
  "page_id": number | null;

  @Column({ nullable: true })
  "specialty_id": number | null;

  @Column({
    type: "enum",
    enum: ["_self", "_blank", "_parent", "_top"],
    default: "_self",
  })
  "target": "_self" | "_blank" | "_parent" | "_top";

  @Column({ type: "varchar", length: 100, nullable: true })
  "icon_class": string | null;

  @Column({ type: "int", default: 0 })
  "display_order": number;

  @Column({ type: "boolean", default: true })
  "is_active": boolean;

  @Column({type: "boolean"})
  "status": boolean;
  
  @CreateDateColumn({ type: "timestamp" })
  "created_at": Date;

  @UpdateDateColumn({ type: "timestamp" })
  "updated_at": Date;

  // ✅ Relationships

  @ManyToOne(() => NavigationMenu, (menu) => menu.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "menu_id" })
  "menu": NavigationMenu;

  @ManyToOne(() => NavigationItem, (item) => item.children, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parent_id" })
  "parent": NavigationItem;

  @OneToMany(() => NavigationItem, (item) => item.parent)
  "children": NavigationItem[];

  @OneToMany(() => NavigationItemPage, (nip) => nip.navigation_item)
  "navigation_item_pages": NavigationItemPage[];

  @ManyToOne(() => Page, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "page_id" })
  "page": Page;

  @ManyToOne(() => Specialty, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "specialty_id" })
  "specialty": Specialty;
}