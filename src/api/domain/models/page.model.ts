import { AppDataSource } from "../../config/db";
import { Page } from "../entities/pages.entities";

const pageRepository = AppDataSource.getRepository(Page);
export const createPage = async (
    reqBody: any,
    callback: (error:any, result:any) => void
) => {
    try {
      const {
        slug,
        title,
        meta_title,
        meta_description,
        meta_keywords,
        page_type = "custom",
        is_active = true,
        is_published = false,
        published_at,
        created_by,
      } = reqBody;

    const page = pageRepository.create({
      slug,
      title,
      meta_title,
      meta_description,
      meta_keywords,
      page_type,
      is_active,
      is_published,
      published_at,
      created_by,
    });

    await pageRepository.save(page);
    return callback(null, page);  
    } catch (error) {
        if(error instanceof Error){
            return callback(error,null)
        }
    }
}

export const getPagesData = async (
    callback: (error: any, result: any) => void
) => {
  try {
    const pages = await pageRepository.find({
      relations: ["menu_items"],
      order: { id: "ASC" },
    });
    return callback(null, pages);
  } catch (error) {
    if (error instanceof Error) return callback(error.message, null);
  }
};

export const getPagesDataById = async (
  id: number,
  callback: (error: any, result: any) => void
) => {
  try {
    const page = await pageRepository.findOne({
      where: { id },
      relations: ["sections", "creator"],
    });

    if (!page) return callback("Page not found", null);

    return callback(null, page);
  } catch (error) {
    if (error instanceof Error) return callback(error.message, null);
  }
};

export const updatePageById = async (
  id: number,
  reqBody: any,
  callback: (error: any, result: any) => void
) => {
  try {
    const page = await pageRepository.findOneBy({ id });
    if (!page) return callback("Page not found", null);

    Object.assign(page, reqBody);

    await pageRepository.save(page);
    return callback(null, page);
  } catch (error) {
    if (error instanceof Error) return callback(error.message, null);
  }
};

export const deactivatePage = async (
  id: number,
  callback: (error: any, result: any) => void
) => {
  try {
    const page = await pageRepository.findOneBy({ id });
    if (!page) return callback("Page not found", null);

    page.is_active = false;
    await pageRepository.save(page);

    return callback(null, { message: "Page deactivated successfully" });
  } catch (error) {
    if (error instanceof Error) return callback(error.message, null);
  }
};

export const getPageDataBySlug = async (
  slug: string,
  callback: (error: any, result: any) => void
) => {
  try {
      const page = await pageRepository.findOne({
          where: { 
              slug: slug,
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

      if (!page) {
          return callback(`Page with slug '${slug}' not found`, null);
      }

      return callback(null, page);
  } catch (error) {
      if (error instanceof Error) {
          return callback(error.message, null);
      }
      return callback('Unknown error occurred', null);
  }
};