import { In } from "typeorm";
import { AppDataSource } from "../../config/db"
import { ContentBlock } from "../entities/content.blocks.entities";
import { Doctor } from "../entities/doctor.entities"
import { DoctorSpecialty } from "../entities/doctor.specialties.entities";
import { Specialty } from "../entities/specialties.entities";
import { DoctorDto } from "../responseDto/response.dto";
import { ContentBlockExpert } from "../entities/content.blocks.expert.entities";

const doctorRepository = AppDataSource.getRepository(Doctor);
const specialtyRepository = AppDataSource.getRepository(Specialty);
const doctorSpecialtyRepository = AppDataSource.getRepository(DoctorSpecialty);
const contentBlockRepo = AppDataSource.getRepository(ContentBlock);
const contentBlockExpertRepo = AppDataSource.getRepository(ContentBlockExpert);

export const createDoctorApi = async(
    reqBody:DoctorDto,
    callback: (error:any, result:any) => void
)=>{
    try {
        // 1️⃣ Create Doctor
        const doctor = doctorRepository.create({
            first_name: reqBody.first_name,
            last_name: reqBody.last_name,
            slug: reqBody.slug,
            designation: reqBody.designation,
            qualifications: reqBody.qualifications,
            specializations: reqBody.specializations ?? null,
            about: reqBody.about ?? null,
            achievements: reqBody.achievements ?? null,
            languages: reqBody.languages ?? null,
            consultation_fee: reqBody.consultation_fee ?? null,
            is_active: reqBody.is_active ?? true,
            is_featured: reqBody.is_featured ?? false,
            display_order: reqBody.display_order ?? 0
        })

        const savedDoctor = await doctorRepository.save(doctor);

         // 2️⃣ Attach specialties (if any)
         if(reqBody.specialty_ids && reqBody.specialty_ids.length > 0){
            for (const specialtyId of reqBody.specialty_ids) {
                const specialty = await specialtyRepository.findOneBy({ id: specialtyId });
                if(specialty){
                    const doctorSpecialty = doctorSpecialtyRepository.create({
                        doctor: savedDoctor,
                        specialty: specialty
                    });
                    await doctorSpecialtyRepository.save(doctorSpecialty)
                }
            }
         }

         // ✅ Return saved doctor with specialties
        const result = await doctorRepository.findOne({
            where: { id: savedDoctor.id },
            relations: ["doctorSpecialties", "doctorSpecialties.specialty"]
        });
        return callback(null, result);
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message, null)
        }
    }
}

export const addExpertContentBlockWise = async (
    reqBody:any,
    callback: (error:any, result:any) => void
) => {
   
    const {content_block_id, doctor_specialty_ids} = reqBody;
    try {

        if (!content_block_id || !Array.isArray(doctor_specialty_ids) || doctor_specialty_ids.length === 0) {
            return callback("content_block_id and doctor_specialty_ids[] are required" ,null)
        }

    const addContentBlockExperts  = async (content_block_id: number, doctor_specialty_ids: number[]) => {
        const contentBlock = await contentBlockRepo.findOneBy({id:content_block_id});
        if(!contentBlock){ 
            throw new Error("Content block not found");
        }

        const doctorSpecialties = await doctorSpecialtyRepository.find({
            where: { id : In(doctor_specialty_ids)},
            relations: ["doctor", "specialty"]
        });
        if(!doctorSpecialties || doctorSpecialties.length === 0){
            throw new Error("No doctor specialties found");
        }

        const experts = doctorSpecialties.map(ds => {
            const expert = new ContentBlockExpert();
            expert.content_block = contentBlock;
            expert.doctorSpecialty = ds;
            return expert
        });
        return await contentBlockExpertRepo.save(experts);
    }
    const experts = await addContentBlockExperts(content_block_id, doctor_specialty_ids);
    return callback(null, 
         experts.map(expert => ({
            id: expert.id,
            content_block_id: expert.content_block.id,
            doctor_specialty_id: expert.doctorSpecialty.id,
            doctor: expert.doctorSpecialty.doctor
            ? {
                id: expert.doctorSpecialty.doctor.id,
                first_name: expert.doctorSpecialty.doctor.first_name,
                last_name: expert.doctorSpecialty.doctor.last_name,
                }
            : null,
            specialty: expert.doctorSpecialty.specialty
            ? {
                id: expert.doctorSpecialty.specialty.id,
                name: expert.doctorSpecialty.specialty.name,
                }
            : null,
        }))
    )
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message, null)
        }
    }
}

export const getDoctorDetailsById = async(
    doctorId: number,
    callback:(error:any, result:any) => void
)=>{
    try {
        const doctor = await doctorRepository.findOne({
            where: {id: doctorId},
            relations:[
                "doctorSpecialties",
                "doctorSpecialties.doctor",
                "doctorSpecialties.specialty",
                // "doctorSpecialties.contentBlocks"
            ]
        });

        if(!doctor){
            return callback("Doctor not found", null)
        }

        return callback(null, doctor)

    } catch (error) {
        if(error instanceof Error){
            return callback(error.message, null)
        }
    }
}