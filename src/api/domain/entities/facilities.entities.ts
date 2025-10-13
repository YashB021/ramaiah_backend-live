import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { Specialty } from "./specialties.entities";
import { ContentBlock } from "./content.blocks.entities";
import { FacilitySpecialty } from "./facility_specialties.entities";

@Entity("facilities")
@Index("idx_slug", ["slug"])
@Index("idx_is_active", ["is_active"])
@Index("idx_display_order", ["display_order"])
export class Facility {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({ length: 100 })
  "name": string;

  @Column({ length: 100, unique: true })
  "slug": string;

  @Column({ type: "text", nullable: true })
  "description": string;

  @Column({ type: "text", nullable: true })
  "features": string;

  @Column({ type: "text", nullable: true })
  "equipment": string;

  @Column({ type: "int", nullable: true })
  "capacity": number;

  @Column({ default: true })
  "is_active": boolean;

  @Column({ default: 0 })
  "display_order": number;

  @CreateDateColumn()
  "created_at": Date;

  @UpdateDateColumn()
  "updated_at": Date;

  // 🔗 Relation with facility_specialties
  @OneToMany(() => FacilitySpecialty, (fs) => fs.facility, { cascade: true })
  "facilitySpecialties": FacilitySpecialty[];

}