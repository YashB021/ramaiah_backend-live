import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ContentBlock } from './content.blocks.entities';

@Entity('accreditations')
export class Accreditation {
  @PrimaryGeneratedColumn()
  "id": number;
  @Column()
  "content_block_id": number;
  @Column({ length: 100 })
  "name": string;
  @Column({ type: 'text', nullable: true })
  "description": string;
  @Column({ nullable: true })
  "year_achieved": number;
  @Column({ default: true })
  "is_active": boolean;
  @CreateDateColumn()
  "created_at": Date;
  @UpdateDateColumn()
  "updated_at": Date;
  @ManyToOne(() => ContentBlock, contentBlock => contentBlock.accreditations)
  @JoinColumn({ name: 'content_block_id' })
  "content_block": ContentBlock;
}