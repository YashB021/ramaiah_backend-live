import { AppDataSource } from "../../config/db";
import { Accreditation } from "../entities/accreditations.entities";
import { AccreditationDto } from "../responseDto/response.dto";

const accreditationRepository = AppDataSource.getRepository(Accreditation);

export const updateAccreditations = async (
    accreditations: AccreditationDto[],
    contentBlockId: number
)=>{
    try {
        // Delete existing accreditations
        await accreditationRepository.delete({ content_block_id: contentBlockId });

        // Insert new accreditations
        for (const accreditation of accreditations) {
            const newAccreditation = new Accreditation();
            newAccreditation.content_block_id = contentBlockId;
            newAccreditation.name = accreditation.name;
            if(accreditation.description) newAccreditation.description = accreditation.description;
            if(accreditation.year_achieved) newAccreditation.year_achieved = accreditation.year_achieved;
            if(accreditation.is_active) newAccreditation.is_active = accreditation.is_active;
            await accreditationRepository.save(newAccreditation);
        }        
    } catch (error) {
        if(error instanceof Error){
            throw error.message
        }
    }
}