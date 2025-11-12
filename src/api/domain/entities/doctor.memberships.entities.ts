import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Doctor } from "./doctor.entities";

@Entity("doctor_memberships")
export class DoctorMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @ManyToOne(() => Doctor, doctor => doctor.memberships, { onDelete: "CASCADE" })
  @JoinColumn({ name: "doctor_id" })
  doctor: Doctor;
}
