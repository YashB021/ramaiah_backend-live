import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { NavigationItem } from "./navigation.items.entities";
import { Section } from "./section.entities";
import { ContentBlock } from "./content.blocks.entities";
import { Facility } from "./facilities.entities";
import { FacilitySpecialty } from "./facility_specialties.entities";
import { DoctorSpecialty } from "./doctor.specialties.entities";

@Entity("specialties")
export class Specialty {
  @PrimaryGeneratedColumn()
  "id": number;

  // @Column({type: "int", nullable: true})
  // "section_id": number;

  @Column({ type: "int", nullable: true })
  "content_block_id": number | null;   // ✅ new foreign key
  
  @Column({ type: "varchar", length: 100 })
  "name": string;

  @Column({ type: "varchar", length: 100, unique: true })
  "slug": string;

  @Column({ type: "varchar", length: 50, nullable: true })
  "short_name": string;

  @Column({ type: "text", nullable: true })
  "description": string;

  @Column({ type: "text", nullable: true })
  "overview": string;

  @Column({ type: "varchar", length: 100, nullable: true })
  "icon_class": string;

  @Column({ type: "varchar", length: 7, default: "#007BFF" })
  "color": string;

  @Column({ type: "boolean", default: true })
  "is_active": boolean;

  @Column({ type: "int", default: 0 })
  "display_order": number;

  @CreateDateColumn({ type: "timestamp" })
  "created_at": Date;

  @UpdateDateColumn({ type: "timestamp" })
  "updated_at": Date;

  // ✅ Relation with NavigationItem
  @OneToMany(() => NavigationItem, (item) => item.specialty)
  "navigationItems": NavigationItem[];

  @ManyToOne(() => ContentBlock, (contentblk) => contentblk.specialties, {onDelete:"CASCADE"})
  @JoinColumn({ name: "content_block_id" })
  "content_block": ContentBlock;

  @OneToMany(() => DoctorSpecialty, ds => ds.specialty)
  "doctorSpecialties": DoctorSpecialty[];

  @OneToMany(() => FacilitySpecialty, fs => fs.specialty)
  "facilitySpecialties": FacilitySpecialty[];
}