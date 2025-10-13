import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContentBlock } from "./content.blocks.entities";
import { DoctorSpecialty } from "./doctor.specialties.entities";

@Entity("content_block_experts")
export class ContentBlockExpert {
  @PrimaryGeneratedColumn()
  "id": number;

  @ManyToOne(() => ContentBlock, block => block.experts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "content_block_id" })
  "content_block": ContentBlock;

  @ManyToOne(() => DoctorSpecialty, ds => ds.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "doctor_specialty_id" })
  "doctorSpecialty": DoctorSpecialty;
}
