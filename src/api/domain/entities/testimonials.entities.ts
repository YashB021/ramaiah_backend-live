import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ContentBlock } from './content.blocks.entities';


@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "content_block_id": number;

  @Column({ length: 100 })
  "name": string;

  @Column({ length: 100, nullable: true })
  "designation": string;

  @Column({ length: 100, nullable: true })
  "company": string;

  @Column({ type: 'text' })
  "testimonial_text": string;

  @Column({ type: 'int', nullable: true })
  "rating": number;

  @Column({ default: false })
  "is_featured": boolean;

  @CreateDateColumn()
  "created_at": Date;

  @UpdateDateColumn()
  "updated_at": Date;

  @ManyToOne(() => ContentBlock, contentBlock => contentBlock.testimonials)
  @JoinColumn({ name: 'content_block_id' })
  "content_block": ContentBlock;
}