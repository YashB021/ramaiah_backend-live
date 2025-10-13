import { AppDataSource } from "../../config/db";
import { FooterCategory } from "../entities/footer.category.entities";
import { FooterContent } from "../entities/footer.content.entities";

const footerCategoryRepository = AppDataSource.getRepository(FooterCategory)
const footerContentRepository = AppDataSource.getRepository(FooterContent);

export const addFooterContent = async(
    reqBody: any,
    callback: (error:any, result:any) => void
) => {
    try {
        const {category_id, slug, title, url, content, icon} = reqBody
        // check if category exists
        const category = await footerCategoryRepository.findOneBy({ id: category_id });
        if (!category) {
            return callback("Footer category not found", null);
        }

        const newContent = footerContentRepository.create({
            category: category,
            title: title,
            slug: slug,
            url: url ?? null,
            content: content ?? null,
            icon: icon ?? null
        });

        const savedContent = await footerContentRepository.save(newContent);

        return callback(null, savedContent);
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message, null)
        }
    }
}

export const updateFooterContent = async(
    id: string,
    reqBody: any,
    callback: (error:any, result:any) => void
) => {
    try {
        const {category_id, slug, title, url, content, icon} = reqBody
        // check if category exists
        const category = await footerCategoryRepository.findOneBy({ id: category_id });
        if (!category) {
            return callback("Footer category not found", null);
        }

        const existingContent = await footerContentRepository.findOne({
            where: {
                id: Number(id)
            }
        });
        if(!existingContent){
            return callback("Footer content not found", null);
        }

        if(slug !== undefined) existingContent.slug = slug;
        if(title !== undefined) existingContent.title = title;
        if(url !== undefined) existingContent.url = url;
        if(content !== undefined) existingContent.content = content;
        if(icon !== undefined) existingContent.icon = icon;
        if(category_id !== undefined) existingContent.category = category;

        await footerContentRepository.save(existingContent);
        return callback(null, existingContent);
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message, null)
        }
    }
}