import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Doctor } from "./doctor.entities";

@Entity("doctor_awards")
export class DoctorAward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @ManyToOne(() => Doctor, doctor => doctor.awards, { onDelete: "CASCADE" })
  @JoinColumn({ name: "doctor_id" })
  doctor: Doctor;
}
