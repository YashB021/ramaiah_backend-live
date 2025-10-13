import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ContentBlock } from './content.blocks.entities';


@Entity('statistics')
export class Statistic {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "content_block_id": number;

  @Column({ length: 50 })
  "statistic_text": string;

  @Column({ length: 50, nullable: true })
  "number": string;

  @Column({ length: 100, nullable: true })
  "label": string;

  @Column({ length: 20, nullable: true })
  "suffix": string;

  @Column({ length: 100, nullable: true })
  "icon_class": string;

  @Column({ length: 7, default: '#007BFF' })
  "color": string;

  @Column({ default: 0 })
  "animation_delay": number;

  @CreateDateColumn()
  "created_at": Date;

  @UpdateDateColumn()
  "updated_at": Date;

  @ManyToOne(() => ContentBlock, contentBlock => contentBlock.statistics)
  @JoinColumn({ name: 'content_block_id' })
  "content_block": ContentBlock;
}