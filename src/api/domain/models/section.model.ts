import { AppDataSource } from "../../config/db";
import { ContentBlock } from "../entities/content.blocks.entities";
import { Page } from "../entities/pages.entities";
import { Section } from "../entities/section.entities";
import { SectionDto } from "../responseDto/response.dto";
import { transformContentBlocks } from "./home.model";

const sectionRepository = AppDataSource.getRepository(Section);
const contentBlockRepository = AppDataSource.getRepository(ContentBlock);
const pageRepository = AppDataSource.getRepository(Page);

export const createSectionData = async(
    sectionData: SectionDto,
    callback:(error:any, result:any) => void
) => {
    const {name, title, section_type, display_order, page_id} = sectionData;
    const page = await pageRepository.findOne({where:{id: page_id} });
    if(!page){
        return callback("Page not found",null);
    }

    try {
        const section = sectionRepository.create({
            name,
            title,
            section_type,
            display_order,
            page_id
        })
        const newSection = await sectionRepository.save(section)
        return callback(null, newSection)
    } catch (error) {
         if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}

export const getSectionsListById = async(
    pageId: number,
    
    callback: (error:any, result:any) => void
) =>{
    
    try {
        const page = await pageRepository.findOne({where:{id: pageId} });
        if(!page){
            return callback("Page not found",null)
        }

        const sections = await sectionRepository.find({
            where: {page_id: pageId},
            relations:[
                
                'content_blocks',
                'content_blocks.media_files',
                'content_blocks.media_files.media_file',
                'content_blocks.statistics',
                'content_blocks.testimonials',
                'content_blocks.accreditations',
                'content_blocks.buttons',
                'content_blocks.faqs',
                
                // Specialities
                "content_blocks.specialties",

                // Facilities
                "content_blocks.facilitySpecialties",
                "content_blocks.facilitySpecialties.facility",
                "content_blocks.facilitySpecialties.specialty",


                "content_blocks.experts", // content_block_experts
                "content_blocks.experts.doctorSpecialty",
                "content_blocks.experts.doctorSpecialty.doctor",
                "content_blocks.experts.doctorSpecialty.specialty",
            ],
            order: {
                display_order: "ASC",   // sort sections by display_order
                content_blocks: {
                    display_order: "ASC",    // sort nested content_block by display_order
                    specialties:{
                        display_order:"ASC",
                    },
                    facilitySpecialties:{
                        facility:{
                            display_order:"ASC"
                        },
                    },
                    experts:{
                        doctorSpecialty:{
                            display_order:"ASC"
                        }
                    }
                }
            } 

        })
        
    // medical-oncology
    sections.forEach(section => {
        section.content_blocks.forEach((block: any) => {
            const grouped: Record<number, { specialty: any; doctors: any[] }> = {};

            block.experts.forEach((cbe: any) => {
                const ds = cbe.doctorSpecialty;
                if (!ds || !ds.specialty) return;

                const specId = ds.specialty.id;

                if (!grouped[specId]) {
                    grouped[specId] = {
                        specialty: ds.specialty,
                        doctors: []
                    };
                }

                grouped[specId].doctors.push(ds.doctor);
            });

            let specialtiesArr = Object.values(grouped);

            

            block.doctorSpecialties = specialtiesArr; // final grouped array
            delete block.experts;
        });
    });

        return callback(null, sections)
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message, null)
        }
    }
}

export const deleteSectionById = async(
    id: number,
    callback: (error:any, result:any) => void
) =>{
    try {
        // find the section
        const section = await sectionRepository.findOne({
            where: { id: Number(id) },
        });

        if (!section) {
            return callback("Section not found",null)
        }

        await sectionRepository.remove(section)

        return callback(null, "Delete successfully.")
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message, null)
        }
    }
}

export const getSectionData = async(
    sectionType: string,
    callback:(error:any, result:any) => void
) => {
    try {
        const section = await sectionRepository.findOne({
        where: { 
            section_type: sectionType,
            is_active: true,
            page: { slug: 'home', is_active: true, is_published: true }
        },
        relations: [
            'content_blocks',
            'content_blocks.media_files',
            'content_blocks.media_files.media_file',
            'content_blocks.statistics',
            'content_blocks.testimonials',
            'content_blocks.accreditations',
            'content_blocks.buttons',
            'content_blocks.faqs'
        ]
        });

    if (!section) {
      return callback("section not found",null);
    }

    // fetch only related content_blocks
    const contentBlocks = await contentBlockRepository.find({
    where: { section_id: section.id, is_active: true },
    relations: [
        'media_files',
        'media_files.media_file',
        'statistics',
        'testimonials',
        'accreditations',
        'buttons',
        'faqs'
    ],
    order: { display_order: "ASC" }
    });


    return callback(null,{
      id: section.id,
      name: section.name,
      title: section.title,
      subtitle: section.subtitle,
      description: section.description,
      section_type: section.section_type,
      display_order: section.display_order,
      background_color: section.background_color,
      text_color: section.text_color,
      padding_top: section.padding_top,
      padding_bottom: section.padding_bottom,
      margin_top: section.margin_top,
      margin_bottom: section.margin_bottom,
      content_blocks: transformContentBlocks(contentBlocks)
    });
    } catch (error) {
         if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}