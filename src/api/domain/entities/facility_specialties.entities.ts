import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index
} from "typeorm";
import { Facility } from "./facilities.entities";
import { Specialty } from "./specialties.entities";
import { ContentBlock } from "./content.blocks.entities";

@Entity("facility_specialties")
@Unique("unique_facility_specialty", ["facility_id", "specialty_id"])
@Index("idx_facility_id", ["facility_id"])
@Index("idx_specialty_id", ["specialty_id"])
export class FacilitySpecialty {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "facility_id": number;

  @Column()
  "specialty_id": number;

  @Column({nullable: true})
  "content_block_id": number;

  @CreateDateColumn()
  "created_at": Date;

  @ManyToOne(() => Facility, (facility) => facility.facilitySpecialties, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "facility_id" })
  "facility": Facility;

  @ManyToOne(() => Specialty, (specialty) => specialty.facilitySpecialties, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "specialty_id" })
  "specialty": Specialty;

  @ManyToOne(() => ContentBlock, (block) => block.facilitySpecialties, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "content_block_id" })
  "contentBlock": ContentBlock;

}