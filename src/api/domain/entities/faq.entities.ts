import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ContentBlock } from './content.blocks.entities';


@Entity('faqs')
export class Faq {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "content_block_id": number;

  @Column({ type: 'text' })
  "question": string;

  @Column({ type: 'text' })
  "answer": string;

  @Column({ length: 100, nullable: true })
  "category": string;

  @Column({ default: true })
  "is_active": boolean;

  @Column({ default: 0 })
  "display_order": number;

  @CreateDateColumn()
  "created_at": Date;

  @UpdateDateColumn()
  "updated_at": Date;

  @ManyToOne(() => ContentBlock, contentBlock => contentBlock.faqs)
  @JoinColumn({ name: 'content_block_id' })
  "content_block": ContentBlock;
}