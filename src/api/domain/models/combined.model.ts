import { AppDataSource } from "../../config/db";
import { Page } from "../entities/pages.entities";
import { Section } from "../entities/section.entities";
import { ContentBlock } from "../entities/content.blocks.entities";
import { createPage } from "./page.model";
import { createSectionData } from "./section.model";
import { createContentBlock } from "./home.model";

const pageRepository = AppDataSource.getRepository(Page);
const sectionRepository = AppDataSource.getRepository(Section);
const contentBlockRepository = AppDataSource.getRepository(ContentBlock);

export const createCombinedContent = async (
    type: string,
    data: any,
    callback: (error: any, result: any) => void
) => {
    try {
        switch (type) {
            case 'page':
                await createPage(data, (error: any, result: any) => {
                    if (error) {
                        return callback(error, null);
                    }
                    return callback(null, result);
                });
                break;

            case 'section':
                await createSectionData(data, (error: any, result: any) => {
                    if (error) {
                        return callback(error, null);
                    }
                    return callback(null, result);
                });
                break;

            case 'content_block':
                if (!data.section_id) {
                    return callback("section_id is required for content_block", null);
                }
                
                await createContentBlock(data, data.section_id, (error: any, result: any) => {
                    if (error) {
                        return callback(error, null);
                    }
                    return callback(null, result);
                });
                break;

            default:
                return callback("Invalid type. Must be one of: page, section, content_block", null);
        }
    } catch (error) {
        if (error instanceof Error) {
            return callback(error.message, null);
        }
        return callback("Unknown error occurred", null);
    }
};
