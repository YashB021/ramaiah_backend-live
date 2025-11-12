import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Doctor } from "./doctor.entities";

@Entity("doctor_experiences")
export class DoctorExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => Doctor, doctor => doctor.experiences, { onDelete: "CASCADE" })
  @JoinColumn({ name: "doctor_id" })
  doctor: Doctor;
}
