import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Section } from './section.entities';
import { User } from './users.entities';
import { NavigationItem } from './navigation.items.entities';
import { NavigationItemPage } from './navigation.item.category.entities';
// import { Section } from './section.entity';
// import { User } from '../../../auth/entities/user.entity';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({ unique: true, length: 100 })
  "slug": string;

  @Column({ length: 255 })
  "title": string;

  @Column({ length: 255, nullable: true })
  "meta_title": string;

  @Column({ type: 'text', nullable: true })
  "meta_description": string;

  @Column({ type: 'text', nullable: true })
  "meta_keywords": string;

  @Column({
    type: 'enum',
    enum: ['home', 'about', 'contact', 'specialty', 'treatment', 'doctor', 'blog', 'custom'],
    default: 'custom'
  })
  "page_type": string;

  @Column({ default: true })
  "is_active": boolean;

  @Column({ default: false })
  "is_published": boolean;

  @Column({ type: 'timestamp', nullable: true })
  "published_at": Date;

  @Column({ nullable: true })
  "created_by": number;

  @CreateDateColumn()
  "created_at": Date;

  @UpdateDateColumn()
  "updated_at": Date;

  @OneToMany(() => Section, section => section.page)
  "sections": Section[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  "creator": User;

  @OneToMany(() => NavigationItem,(item) => item.page)
  "menu_items": NavigationItem[] 

  @OneToMany(() => NavigationItemPage, (nip) => nip.page)
  "navigation_item_pages": NavigationItemPage[];
}