import { AppDataSource } from "../../config/db";
import { FooterCategory } from "../entities/footer.category.entities";

const footerCategoryRepository =AppDataSource.getRepository(FooterCategory);

export const getFooterCategories = async(
    callback: (error:any, result:any) => void
) => {
    try {
        const categories = await footerCategoryRepository.find({
            relations: ["contents"],       // load related footer contents
            order: { display_order: "ASC" } // order by display_order
        });

        return callback(null, categories);
    } catch (error) {
        if(error instanceof Error){
            return callback(error.message, null)
        }
    }
}