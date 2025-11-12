import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { DoctorSpecialty } from "./doctor.specialties.entities";
;
import { DoctorAward } from "./doctor.awards.entities";
import { DoctorBlog } from "./doctor.blogs.entities";
import { DoctorFellowship } from "./doctor.fellowship.entities";
import { DoctorExperience } from "./doctor.experience.entities";
import { DoctorMembership } from "./doctor.memberships.entities";

@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({ type: "varchar", length: 50 })
  "first_name": string;

  @Column({ type: "varchar", length: 50 })
  "last_name": string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 100 })
  "slug": string;

  @Column({ type: "varchar", default: null })
  "profile_image": string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  "designation": string | null;

  @Column({ type: "text", nullable: true })
  "qualifications": string | null;

  @Column({ type: "int", nullable: true })
  "experience_years": number | null;

  @Column({ type: "text", nullable: true })
  "specializations": string | null;

  @Column({ type: "text", nullable: true })
  "about": string | null;

  @Column({ type: "text", nullable: true })
  "achievements": string | null;

  @Column({ type: "text", nullable: true })
  "languages": string | null;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  "consultation_fee": number | null;

  @Index()
  @Column({ type: "boolean", default: true })
  "is_active": boolean;

  @Index()
  @Column({ type: "boolean", default: false })
  "is_featured": boolean;

  @Index()
  @Column({ type: "int", default: 0 })
  "display_order": number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  "created_at": Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  "updated_at": Date;

  // 🔗 Relation with doctor_specialties
  @OneToMany(() => DoctorSpecialty, ds => ds.doctor)
  "doctorSpecialties": DoctorSpecialty[];

  @OneToMany(() => DoctorFellowship, fellowship => fellowship.doctor)
  fellowships: DoctorFellowship[];

  @OneToMany(() => DoctorExperience, experience => experience.doctor)
  experiences: DoctorExperience[];

  @OneToMany(() => DoctorAward, award => award.doctor)
  awards: DoctorAward[];

  @OneToMany(() => DoctorMembership, membership => membership.doctor)
  memberships: DoctorMembership[];

  @OneToMany(() => DoctorBlog, blog => blog.doctor)
  blogs: DoctorBlog[];




}