import { AppDataSource } from "../../config/db"
import { DoctorSpecialty } from "../entities/doctor.specialties.entities";
import { Specialty } from "../entities/specialties.entities"

const specialtiesRepo = AppDataSource.getRepository(Specialty);
const doctorSpecialtyRepository = AppDataSource.getRepository(DoctorSpecialty);

export const getSpecialties = async(
    callback:(error:any, result:any)=>void
) => {
    try {
        const specialties = await specialtiesRepo.find();
        return callback(null, specialties);
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}

export const createNewSpecialties = async(
    reqBody:any,
    callback:(error:any, result:any)=>void
) => {
    try {
        const { content_block_id, name, slug, short_name, description, overview, icon_class, color, is_active, display_order
        } = reqBody;

        // create new specialty
        const specialty = specialtiesRepo.create({
            content_block_id: null,
            name: name,
            slug: slug,
            short_name: short_name,
            description: description,
            overview: overview,
            icon_class: icon_class,
            color: color ?? "#007BFF",
            is_active: is_active ?? true,
            display_order: display_order ?? 0
        });

    const savedSpecialty = await specialtiesRepo.save(specialty);
    return callback(null, savedSpecialty);
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}

export const getDoctorSpecialist = async(
    reqBody:any,
    callback:(error:any, result:any)=>void
) => {
    try {
        const { search } = reqBody;
        const getDoctorSpecialties = async (search?: string) => {
            const query = await doctorSpecialtyRepository.createQueryBuilder("ds")
            .leftJoinAndSelect("ds.doctor","doctor")
            .leftJoinAndSelect("ds.specialty","specialty");

            if (search) {
                query.andWhere(
                    "doctor.first_name ILIKE :search OR doctor.last_name ILIKE :search OR specialty.name ILIKE :search OR specialty.slug ILIKE :search",
                    { search: `%${search}%` }
                );
            }
            return await query.orderBy("doctor.first_name", "ASC").getMany();
        }

        const doctorSpecialties = await getDoctorSpecialties(search as string);
        const formatted = doctorSpecialties.map(ds => ({
            id: ds.id,
            doctor: ds.doctor
            ? {
                id: ds.doctor.id,
                first_name: ds.doctor.first_name,
                last_name: ds.doctor.last_name,
                slug: ds.doctor.slug,
            }
            : null,
            specialty: ds.specialty
            ? {
                id: ds.specialty.id,
                name: ds.specialty.name,
                slug: ds.specialty.slug,
            }
            : null,
        }));

        return callback(null, formatted)
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}
