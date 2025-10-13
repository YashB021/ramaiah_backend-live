import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ContentBlock } from './content.blocks.entities';
import { MediaFile } from './media.files.entities';
// import { ContentBlock } from './content-block.entity';
// import { MediaFile } from './media-file.entity';

@Entity('content_block_media')
export class ContentBlockMedia {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "content_block_id": number;

  @Column()
  "media_file_id": number;

  @Column({
    type: 'enum',
    enum: ['primary', 'background', 'icon', 'thumbnail', 'gallery','slider'],
    default: 'primary'
  })
  "media_type": string;

  @Column({ default: 0 })
  "display_order": number;

  @CreateDateColumn()
  "created_at": Date;

  @ManyToOne(() => ContentBlock, contentBlock => contentBlock.media_files)
  @JoinColumn({ name: 'content_block_id' })
  "content_block": ContentBlock;

  @ManyToOne(() => MediaFile)
  @JoinColumn({ name: 'media_file_id' })
  "media_file": MediaFile;
}