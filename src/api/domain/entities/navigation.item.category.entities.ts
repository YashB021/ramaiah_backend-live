import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NavigationItem } from "./navigation.items.entities";
import { Page } from "./pages.entities";

@Entity("navigation_item_pages")
export class NavigationItemPage {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "navigation_item_id": number;

  @Column()
  "page_id": number;

  @Column({ type: "int", default: 0 })
  "display_order": number;
  
  @ManyToOne(() => NavigationItem, (item) => item.navigation_item_pages, { onDelete: "CASCADE" })
  @JoinColumn({ name: "navigation_item_id" })
  "navigation_item": NavigationItem;

  @ManyToOne(() => Page, (page) => page.navigation_item_pages, { onDelete: "CASCADE" })
  @JoinColumn({ name: "page_id" })
  "page": Page;
}