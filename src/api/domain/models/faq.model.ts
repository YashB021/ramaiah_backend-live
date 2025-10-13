import { AppDataSource } from "../../config/db";
import { Faq } from "../entities/faq.entities";
import { FAQDto } from "../responseDto/response.dto";

const faqRepository = AppDataSource.getRepository(Faq);

export const updateFaqs = async(
    faqs: FAQDto[],
    contentBlockId: number
):Promise<void> => {
    try {
        // Delete existing FAQs
        await faqRepository.delete({ content_block_id: contentBlockId });

        // Insert new FAQs
        for (const faq of faqs) {
            const newFaq = new Faq();
            newFaq.content_block_id = contentBlockId;
            newFaq.question = faq.question;
            newFaq.answer = faq.answer;
            if(faq.category) newFaq.category = faq.category;
            if(faq.is_active) newFaq.is_active = faq.is_active;
            if(faq.display_order) newFaq.display_order = faq.display_order;
            await faqRepository.save(newFaq);
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error; // rethrow instead of return
        }
        throw error;
    }
}