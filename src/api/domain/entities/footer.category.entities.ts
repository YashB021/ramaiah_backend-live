import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FooterContent } from "./footer.content.entities";

@Entity('footer_category')
export class FooterCategory {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "name": string;

  @Column()
  "slug": string;

  @OneToMany(() => FooterContent, content => content.category)
  "contents": FooterContent[];

  @Column({ type:"int",default:0})
  "display_order": number;
  
  @CreateDateColumn({ type: 'timestamp' })
  "created_at": Date;

  @UpdateDateColumn({ type: 'timestamp' })
  "updated_at": Date;
}