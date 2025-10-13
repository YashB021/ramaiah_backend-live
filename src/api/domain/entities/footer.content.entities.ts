import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FooterCategory } from "./footer.category.entities";

@Entity('footer_content')
export class FooterContent {
  @PrimaryGeneratedColumn()
  "id": number;

  @ManyToOne(() => FooterCategory, category => category.contents)
  @JoinColumn({ name: 'category_id' })
  "category": FooterCategory;

  @Column()
  "title": string;
  
  @Column()
  "slug": string;
  
  @Column({ nullable: true })
  "url": string;

  @Column({ type: 'text', nullable: true })
  "content": string;

  @Column({ nullable: true })
  "icon": string;

  @CreateDateColumn({ type: 'timestamp' })
  "created_at": Date;

  @UpdateDateColumn({ type: 'timestamp' })
  "updated_at": Date;
}