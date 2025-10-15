import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Section } from './section.entities';
import { ContentBlockMedia } from './content.block.media.entities';
import { Statistic } from './statistics.entities';
import { Testimonial } from './testimonials.entities';
import { Accreditation } from './accreditations.entities';
import { Button } from './button.entities';
import { Faq } from './faq.entities';
import { FacilitySpecialty } from './facility_specialties.entities';
import { Facility } from './facilities.entities';
import { DoctorSpecialty } from './doctor.specialties.entities';
import { Specialty } from './specialties.entities';
import { ContentBlockExpert } from './content.blocks.expert.entities';
// import { Section } from './section.entity';
// import { ContentBlockMedia } from './content-block-media.entity';
// import { Statistic } from './statistic.entity';
// import { Testimonial } from './testimonial.entity';
// import { Accreditation } from './accreditation.entity';
// import { Button } from './button.entity';
// import { Faq } from './faq.entity';

@Entity('content_blocks')
export class ContentBlock {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "section_id": number;

  @Column({
    type: 'enum',
    enum: ['text', 'image','background_image', 'video', 'button', 'icon', 'statistic', 'testimonial', 'accreditation', 'doctor', 'treatment', 'facility', 'custom']
  })
  "block_type": string;

  @Column({ length: 255, nullable: true })
  "title": string;

  @Column({ type: 'text', nullable: true })
  "content": string;

  @Column({ length: 255, nullable: true })
  "subtitle": string;

  @Column({ type: 'text', nullable: true })
  "description": string;

  @Column({ default: 0 })
  "display_order": number;

  @Column({ default: true })
  "is_active": boolean;

  @Column({default: true})
  "status": boolean;
  
  @Column({
    type: 'enum',
    enum: ['left', 'center', 'right'],
    default: 'left'
  })
  "alignment": string;

  @Column({ default: 100 })
  "width_percentage": number;

  @Column({ type: 'text', nullable: true })
  "custom_css": string;

  @CreateDateColumn()
  "created_at": Date;

  @UpdateDateColumn()
  "updated_at": Date;

  @ManyToOne(() => Section, section => section.content_blocks)
  @JoinColumn({ name: 'section_id' })
  "section": Section;

  @OneToMany(() => ContentBlockMedia, media => media.content_block)
  "media_files": ContentBlockMedia[];

  @OneToMany(() => Statistic, statistic => statistic.content_block)
  "statistics": Statistic[];

  @OneToMany(() => Testimonial, testimonial => testimonial.content_block)
  "testimonials": Testimonial[];

  @OneToMany(() => Accreditation, accreditation => accreditation.content_block)
  "accreditations": Accreditation[];

  @OneToMany(() => Button, button => button.content_block)
  "buttons": Button[];

  @OneToMany(() => Faq, faq => faq.content_block)
  "faqs": Faq[];

  // 🔹 Specialties (for "Our Specialities" section)
  @OneToMany(() => Specialty, specialty => specialty.content_block)
  "specialties": Specialty[];

  // 🔹 Facilities (for "Services & Facilities" section, many-to-many)
  @OneToMany(() => FacilitySpecialty, fs => fs.contentBlock,{onDelete:"CASCADE"})
  "facilitySpecialties": FacilitySpecialty[];

//   @OneToMany(() => DoctorSpecialty, (ds) => ds.content_block, { cascade: true })
//  "doctorSpecialties": DoctorSpecialty[];

  @OneToMany(() => ContentBlockExpert, expert => expert.content_block)
  "experts": ContentBlockExpert[];
}