import { AppDataSource } from "../../config/db"
import { ContentBlockMedia } from "../entities/content.block.media.entities";
import { ContentBlock as EntityContentBlock  } from "../entities/content.blocks.entities";
import { Page } from "../entities/pages.entities"
import { Section } from "../entities/section.entities";
import { ButtonDto, ContentBlockDto, ContentBlockDto as DtoContentBlock, MediaFileDto, SectionDto, UpdateHomePageDto } from "../responseDto/response.dto";
import { updateAccreditations } from "./accreditations.model";
import { updateButtons } from "./button.model";
import { updateFaqs } from "./faq.model";
import { updateContentBlockMedia } from "./media.model";
import { getSectionData } from "./section.model";
import { updateStatistics } from "./statistics.model";
import { updateTestimonials } from "./testimonials.model";

const pageRepository = AppDataSource.getRepository(Page);
const sectionRepository = AppDataSource.getRepository(Section);
const contentBlockRepository = AppDataSource.getRepository(EntityContentBlock);
const contentBlockMediaRepository = AppDataSource.getRepository(ContentBlockMedia);



export const getHomePageData = async (
    callback:(error:any, result:any) => void
) => {
    try {
        const homePage = await pageRepository.findOne({
            where: { 
                slug: 'home',
                is_active: true,
                is_published: true 
            },
            relations: [
                'sections',
                'sections.content_blocks',
                'sections.content_blocks.media_files',
                'sections.content_blocks.media_files.media_file',
                'sections.content_blocks.statistics',
                'sections.content_blocks.testimonials',
                'sections.content_blocks.accreditations',
                'sections.content_blocks.buttons',
                'sections.content_blocks.faqs'
            ]
        });

        if (!homePage) {
            return callback('Home page not found',null)
        }
       
        const activeSections = homePage.sections
        .filter(section => section.is_active)
        .sort((a, b) => a.display_order - b.display_order);
        
        const sections: SectionDto[] = activeSections.map(section => ({
            id: section.id,
            name: section.name,
            title: section.title,
            subtitle: section.subtitle,
            description: section.description,
            section_type: section.section_type as SectionDto["section_type"],
            display_order: section.display_order,
            background_color: section.background_color,
            text_color: section.text_color,
            padding_top: section.padding_top,
            padding_bottom: section.padding_bottom,
            margin_top: section.margin_top,
            margin_bottom: section.margin_bottom,
            content_blocks: transformContentBlocks(section.content_blocks)
        }));
       
        
        return callback(null,{
            id: homePage.id,
            slug: homePage.slug,
            title: homePage.title,
            meta_title: homePage.meta_title,
            meta_description: homePage.meta_description,
            meta_keywords: homePage.meta_keywords,
            sections
        })
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}
export const getHomePageDataAdmin = async (
    callback:(error:any, result:any) => void
) => {
    try {
         const page = await pageRepository.findOne({
      where: { slug:"home", is_active: true, is_published: true },
      relations: [
        'sections',
        'sections.content_blocks',
        'sections.content_blocks.media_files',
        'sections.content_blocks.media_files.media_file',
        'sections.content_blocks.statistics',
        'sections.content_blocks.testimonials',
        'sections.content_blocks.accreditations',
        'sections.content_blocks.buttons',
        'sections.content_blocks.faqs'
      ]
    });

    if (!page) {
      return callback('Page not found',null)
    }

    // collect all active content_blocks across sections
    const contentBlocks = page.sections
      .filter(section => section.is_active)
      .flatMap(section =>
        section.content_blocks
          .filter(cb => cb.is_active)
          .map(cb => ({
            id: cb.id,
            section_id: cb.section_id,
            block_type: cb.block_type,
            title: cb.title,
            subtitle: cb.subtitle,
            description: cb.description,
            content: cb.content,
            alignment: cb.alignment,
            width_percentage: cb.width_percentage,
            custom_css: cb.custom_css,
            display_order: cb.display_order,

            media_files: cb.media_files
            .sort((a, b) => a.display_order - b.display_order)
            .map(mf => ({
              id: mf.id,
              media_file: mf.media_file
            })),

            statistics: cb.statistics,
            testimonials: cb.testimonials,
            accreditations: cb.accreditations,
            buttons: cb.buttons,
            faqs: cb.faqs
          }))
      )
      // 🔑 Sort by section_id first, then display_order
      .sort((a, b) =>
        a.section_id === b.section_id
          ? a.display_order - b.display_order
          : a.section_id - b.section_id
      );
      return callback(null, contentBlocks)
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}

export const transformContentBlocks = (contentBlocks: EntityContentBlock[]): DtoContentBlock[] => {
  return contentBlocks
    .filter((block) => block.is_active)
    .sort((a, b) => a.display_order - b.display_order)
    .map((block) => ({
      id: block.id,
      section_id:block.section_id,
      block_type: block.block_type as DtoContentBlock["block_type"],
      title: block.title,
      content: block.content,
      subtitle: block.subtitle,
      description: block.description,
      display_order: block.display_order,
      alignment: block.alignment as DtoContentBlock["alignment"],
      width_percentage: block.width_percentage,

      media_files:
        block.media_files?.map((media) => ({
          id: media.id,
          file_url: media.media_file.file_url,
          alt_text: media.media_file.alt_text,
          media_type: media.media_type as MediaFileDto["media_type"],
          display_order: media.display_order,
          media_file: media.media_file
        })) || [],

      statistics:
        block.statistics?.map((stat) => ({
          id: stat.id,
          number: stat.number,
          statistic_text: stat.statistic_text,
          label: stat.label,
          suffix: stat.suffix,
          icon_class: stat.icon_class,
          color: stat.color,
          animation_delay: stat.animation_delay,
        })) || [],

      testimonials:
        block.testimonials?.map((testimonial) => ({
          id: testimonial.id,
          name: testimonial.name,
          designation: testimonial.designation,
          company: testimonial.company,
          testimonial_text: testimonial.testimonial_text,
          rating: testimonial.rating,
          is_featured: testimonial.is_featured,
        })) || [],

      accreditations:
        block.accreditations?.map((accreditation) => ({
          id: accreditation.id,
          name: accreditation.name,
          description: accreditation.description,
          year_achieved: accreditation.year_achieved,
          is_active: accreditation.is_active,
        })) || [],

      buttons:
        block.buttons?.map((button) => ({
          id: button.id,
          text: button.text,
          url: button.url,
          button_type: button.button_type as ButtonDto["button_type"],
          size: button.size as ButtonDto["size"],
          target: button.target as ButtonDto["target"],
          icon_class: button.icon_class,
        })) || [],

      faqs:
        block.faqs
          ?.filter((faq) => faq.is_active)
          .map((faq) => ({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            category: faq.category,
            is_active: faq.is_active,
            display_order: faq.display_order,
          })) || [],
    }));
};

export const updateHomePage = async(
    updateData: UpdateHomePageDto,
    callback:(error:any, result:any) => void
)=>{
    try {
        // Update page metadata
      const homePage = await pageRepository.findOne({
        where: { slug: 'home' }
      });

      if (!homePage) {
        return callback("Home page not found",null)
      }

      if (updateData.title) homePage.title = updateData.title;
      if (updateData.meta_title) homePage.meta_title = updateData.meta_title;
      if (updateData.meta_description) homePage.meta_description = updateData.meta_description;
      if (updateData.meta_keywords) homePage.meta_keywords = updateData.meta_keywords;

      await pageRepository.save(homePage);

      // Update sections if provided
      // if (updateData.sections) {
      //   for (const sectionData of updateData.sections) {
      //     await updateSection(sectionData, homePage.id,(error:any, result:any) => {
      //       if(error){
      //           return callback("something went wrong to updateSection",null)
      //       }
      //     });
      //   }
      // }

      return getHomePageData((error:any, result:any) => {
        if(error){
            return callback(error,null)
        }
        return callback(null, result);
      });

    } catch (error) {
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}

export const updateSection = async(
    sectionData: SectionDto,
    pageId: number,
    sectionId: number,
    callback:(error:any, result:any) => void
)=>{
    try {
        let section: Section | null;

    if (sectionData.id) {
      section = await sectionRepository.findOne({
        where: { id: sectionData.id, page_id: pageId }
      });

      if (!section) {
        return callback(`Section with ID ${sectionData.id} not found`,null)
      }
    } else {
      section = new Section();
      section.page_id = pageId;
      section.id = sectionId;
    }

    if(sectionData.name) section.name = sectionData.name;
    if(sectionData.is_active) section.is_active = sectionData.is_active;
    if(sectionData.section_type) section.section_type = sectionData.section_type;
    if (sectionData.title) section.title = sectionData.title;
    if (sectionData.subtitle) section.subtitle = sectionData.subtitle;
    if (sectionData.description) section.description = sectionData.description;
    if (sectionData.display_order !== undefined) section.display_order = sectionData.display_order;
    if (sectionData.background_color) section.background_color = sectionData.background_color;
    if (sectionData.text_color) section.text_color = sectionData.text_color;
    if (sectionData.padding_top !== undefined) section.padding_top = sectionData.padding_top;
    if (sectionData.padding_bottom !== undefined) section.padding_bottom = sectionData.padding_bottom;
    if (sectionData.margin_top !== undefined) section.margin_top = sectionData.margin_top;
    if (sectionData.margin_bottom !== undefined) section.margin_bottom = sectionData.margin_bottom;

    const savedSection = await sectionRepository.save(section);

    // Update content blocks if provided
    if (sectionData.content_blocks) {
      for (const contentBlockData of sectionData.content_blocks) {
        await updateContentBlock(contentBlockData, savedSection.id,(error:any, result:any) => {
            if(error){
                return callback(error,null)
            }
            return result
        });
      }
    }
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}

export const updateContentBlock = async (
    contentBlockData: ContentBlockDto, 
    sectionId: number,
    callback: (error:any, result:any) => void
) => {
    let contentBlock: EntityContentBlock | null;
    
    if (contentBlockData.id) {
      contentBlock = await contentBlockRepository.findOne({
        where: { id: contentBlockData.id, section_id: sectionId }
      });
      if (!contentBlock) {
        return callback(`Content block with ID ${contentBlockData.id} not found`,null);
      }
    } else {
      contentBlock = new EntityContentBlock();
      contentBlock.section_id = sectionId;
    }

    if(contentBlockData.block_type) contentBlock.block_type = contentBlockData.block_type;
    if (contentBlockData.title) contentBlock.title = contentBlockData.title;
    if (contentBlockData.content) contentBlock.content = contentBlockData.content;
    if (contentBlockData.subtitle) contentBlock.subtitle = contentBlockData.subtitle;
    if (contentBlockData.description) contentBlock.description = contentBlockData.description;
    if (contentBlockData.display_order !== undefined) contentBlock.display_order = contentBlockData.display_order;
    if (contentBlockData.alignment) contentBlock.alignment = contentBlockData.alignment;
    if (contentBlockData.width_percentage !== undefined) contentBlock.width_percentage = contentBlockData.width_percentage;
    if (contentBlockData.status) contentBlock.status = contentBlockData.status;

    const savedContentBlock = await contentBlockRepository.save(contentBlock);
    
    if(contentBlockData.media_files){
      await updateContentBlockMedia(contentBlockData.media_files, savedContentBlock.id);
    }

    // Update related entities
    if (contentBlockData.statistics) {
      await updateStatistics(contentBlockData.statistics, savedContentBlock.id);
    }

    if (contentBlockData.testimonials) {
      await updateTestimonials(contentBlockData.testimonials, savedContentBlock.id);
    }

    if (contentBlockData.accreditations) {
      await updateAccreditations(contentBlockData.accreditations, savedContentBlock.id);
    }

    if (contentBlockData.buttons) {
      await updateButtons(contentBlockData.buttons, savedContentBlock.id);
    }

    if (contentBlockData.faqs) {
      await updateFaqs(contentBlockData.faqs, savedContentBlock.id);
    }

    getHomePageDataAdmin((error, result) =>{
      if(error){
        return callback(error,null)
      }  
      return callback(null, result)
    })
  }



export const quickLinksData = async (
    callback: (error:any, result:any) => void
) => {
    try {
        const ctaSection = await sectionRepository.findOne({
        where: { 
            section_type: 'cta',
            is_active: true,
            page: { slug: 'home', is_active: true, is_published: true }
        },
        relations: [
            'content_blocks',
            'content_blocks.buttons'
        ]
        });

    if (!ctaSection) {
      return callback(null,[])
    }

    return callback(null,transformContentBlocks(ctaSection.content_blocks));
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
  }

  export const updateSectionById = async (
    sectionId: number,
    updateData:SectionDto,
    callback: (error:any, result:any) => void
) => {
    try {
       const section = await sectionRepository.findOne({
            where: { id: sectionId },
            relations: ['page']
        });

        if (!section) {
            return callback(`Section with ID ${sectionId} not found`,null)
        }

        // if (section.page.slug !== 'home') {
        //     return callback('Can only update sections of home page',null)
        // }

        await updateSection(updateData, Number(section.page_id),sectionId,(error:any, result:any)=> {
            if(error){
                return callback(error,null)
            }
        });

        return getHomePageDataAdmin((error:any, result:any) => {
            if(error){
                return callback(error,null)
            }
            return callback(null,result)
        });
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
  }

export const createContentBlock = async (
    contentBlockData:ContentBlockDto,
    sectionId: number,
    callback: (error:any, result:any) => void
) => {
  try {
      const section = await sectionRepository.findOne({
      where: { id: sectionId },
      relations: ['page']
    });

    if (!section) {
      return callback(`Section with ID ${sectionId} not found`,null);
    }

    // if (section.page.slug !== 'home') {
    //   return callback('Can only create content blocks for home page',null)
    // }
    
    console.log("contentBlockData..........",contentBlockData)
    await updateContentBlock(contentBlockData, sectionId,(error:any, result:any) =>{
      if(error){
          return callback(error,null)
      }
    });

    // Return the created content block
    const createdBlock = await contentBlockRepository.findOne({
      where: { section_id: sectionId },
      relations: [
        'media_files',
        'media_files.media_file',
        'statistics',
        'testimonials',
        'accreditations',
        'buttons',
        'faqs'
      ],
      order: { created_at: 'DESC' }
    });
    if(!createdBlock){
      return callback("content block not found",null)
    }
    return callback(null,transformContentBlocks([createdBlock])[0]);
  } catch (error) {
    console.log("err...",error)
      if(error instanceof Error){
          return callback(error.message,null)
      }
  }
}

export const deleteContentBlockById = async (
    contentBlockId: number,
    callback: (error:any, result:any) => void
) => {
  try {
    await contentBlockRepository.delete({id: contentBlockId});
    return callback(null,"Delete successfully.");
  } catch (error) {
    console.log("err...",error)
      if(error instanceof Error){
          return callback(error.message,null)
      }
  }
}

export const deleteContentBlockMediaById = async (
    contentBlockMediaId: number,
    callback: (error:any, result:any) => void
) => {
  try {
    await contentBlockMediaRepository.delete({id: contentBlockMediaId});
    return callback(null,"Delete successfully.");
  } catch (error) {
      if(error instanceof Error){
          return callback(error.message,null)
      }
  }
}