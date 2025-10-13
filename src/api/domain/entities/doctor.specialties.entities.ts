import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./doctor.entities";
import { Specialty } from "./specialties.entities";
import { ContentBlock } from "./content.blocks.entities";
import { ContentBlockExpert } from "./content.blocks.expert.entities";


@Entity("doctor_specialties")
export class DoctorSpecialty {
  @PrimaryGeneratedColumn()
  "id": number;

  @ManyToOne(() => Doctor, doctor => doctor.doctorSpecialties, { onDelete: "CASCADE" })
  @JoinColumn({ name: "doctor_id" })
  "doctor": Doctor;

  @ManyToOne(() => Specialty, specialty => specialty.doctorSpecialties, { onDelete: "CASCADE" })
  @JoinColumn({ name: "specialty_id" })
  "specialty": Specialty;

  @OneToMany(() => ContentBlockExpert, cbe => cbe.doctorSpecialty)
  "contentBlocks": ContentBlockExpert[];

  @CreateDateColumn()
  "created_at": Date;
}