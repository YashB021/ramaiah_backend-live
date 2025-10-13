import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ContentBlock } from './content.blocks.entities';

@Entity('buttons')
export class Button {
  @PrimaryGeneratedColumn()
  "id": number;
  @Column()
  "content_block_id": number;
  @Column({ length: 100 })
  "text": string;
  @Column({ length: 500, nullable: true })
  "url": string;
  @Column({
    type: 'enum',
    enum: ['primary', 'secondary', 'outline', 'link'],
    default: 'primary'
  })
  "button_type": string;
  @Column({
    type: 'enum',
    enum: ['small', 'medium', 'large'],
    default: 'medium'
  })
  "size": string;
  @Column({
    type: 'enum',
    enum: ['_self', '_blank', '_parent', '_top'],
    default: '_self'
  })
  "target": string;
  @Column({ length: 100, nullable: true })
  "icon_class": string;
  @Column({ type: 'text', nullable: true })
  "custom_css": string;
  @CreateDateColumn()
  "created_at": Date;
  @UpdateDateColumn()
  "updated_at": Date;
  @ManyToOne(() => ContentBlock, contentBlock => contentBlock.buttons)
  @JoinColumn({ name: 'content_block_id' })
  "content_block": ContentBlock;
}