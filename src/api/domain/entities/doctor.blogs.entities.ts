import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Doctor } from "./doctor.entities";

@Entity("doctor_blogs")
export class DoctorBlog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  link: string;

  @Column({ type: "date", nullable: true })
  date: string;

  @ManyToOne(() => Doctor, doctor => doctor.blogs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "doctor_id" })
  doctor: Doctor;
}
