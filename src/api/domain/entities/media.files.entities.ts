import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './users.entities';
// import { User } from '../../../auth/entities/user.entity';

@Entity('media_files')
export class MediaFile {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({ length: 255 })
  "filename": string;

  @Column({ length: 255 })
  "original_filename": string;

  @Column({ length: 500 })
  "file_path": string;

  @Column({ length: 500 })
  "file_url": string;

  @Column({
    type: 'enum',
    enum: ['image', 'video', 'document', 'audio']
  })
  "file_type": string;

  @Column({ length: 100 })
  "mime_type": string;

  @Column({ type: 'bigint' })
  "file_size": number;

  @Column({ nullable: true })
  "width": number;

  @Column({ nullable: true })
  "height": number;

  @Column({ nullable: true })
  "duration": number;

  @Column({ length: 255, nullable: true })
  "alt_text": string;

  @Column({ type: 'text', nullable: true })
  "caption": string | null;

  @Column({ nullable: true })
  "uploaded_by": number;

  @CreateDateColumn()
  "created_at": Date;

  @UpdateDateColumn()
  "updated_at": Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'uploaded_by' })
  "uploader": User;
}