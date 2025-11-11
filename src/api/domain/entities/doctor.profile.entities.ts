import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { Doctor } from "./doctor.entities";
  
  @Entity("doctor_profiles")
  export class DoctorProfile {
    @PrimaryGeneratedColumn()
    "id": number;
  
    @OneToOne(() => Doctor, (doctor) => doctor.profile, { onDelete: "CASCADE" })
    @JoinColumn({ name: "doctor_id" })
    "doctor": Doctor;
  
    @Column({ type: "text", nullable: true })
    "overview": string | null;
  
    @Column({ type: "jsonb", nullable: true })
    "overview_paragraphs": string[] | null;
  
    @Column({ type: "jsonb", nullable: true })
    "expertise": string[] | null;
  
    @Column({ type: "jsonb", nullable: true })
    "fellowships": string[] | null;
  
    @Column({ type: "jsonb", nullable: true })
    "awards": string[] | null;
  
    @Column({ type: "jsonb", nullable: true })
    "experience": string[] | null;
  
    @Column({ type: "jsonb", nullable: true })
    "memberships": string[] | null;
  
    @Column({ type: "jsonb", nullable: true })
    "blogs": {
      date: string;
      title: string;
      description: string;
      doctor: string;
      link: string;
    }[] | null;
  
    @CreateDateColumn()
    "created_at": Date;
  
    @UpdateDateColumn()
    "updated_at": Date;
  }
  