import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Page } from './pages.entities';
import { ContentBlock } from './content.blocks.entities';
import { Specialty } from './specialties.entities';
// import { Page } from './page.entity';
// import { ContentBlock } from './content-block.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({nullable: true})
  "page_id": number | null;

  @Column({ length: 100 })
  "name": string;

  @Column({ length: 255, nullable: true })
  "title": string;

  @Column({ type: 'text', nullable: true })
  "subtitle": string;

  @Column({ type: 'text', nullable: true })
  "description": string;

  @Column({
    type: 'enum',
    enum: ['hero', 'testimonials', 'statistics', 'accreditations', 'legacy', 'journey', 'cta', 'doctors', 'treatments', 'facilities', 'faq', 'custom','overview','specialities','experts']
  })
  "section_type": string;

  @Column({ default: 0 })
  "display_order": number;

  @Column({ default: true })
  "is_active": boolean;

  @Column({ length: 7, default: '#FFFFFF' })
  "background_color": string;

  @Column({ length: 7, default: '#000000' })
  "text_color": string;

  @Column({ default: 0 })
  "padding_top": number;

  @Column({ default: 0 })
  "padding_bottom": number;

  @Column({ default: 0 })
  "margin_top": number;

  @Column({ default: 0 })
  "margin_bottom": number;

  @Column({ type: 'text', nullable: true })
  "custom_css": string;

  @CreateDateColumn()
  "created_at": Date;

  @UpdateDateColumn()
  "updated_at": Date;

  @ManyToOne(() => Page, page => page.sections)
  @JoinColumn({ name: 'page_id' })
  "page": Page;

  @OneToMany(() => ContentBlock, contentBlock => contentBlock.section)
  "content_blocks": ContentBlock[];

}