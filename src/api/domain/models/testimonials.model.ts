import { AppDataSource } from "../../config/db";
import { Testimonial } from "../entities/testimonials.entities";
import { TestimonialDto } from "../responseDto/response.dto";

const testimonialrepository = AppDataSource.getRepository(Testimonial);
export const updateTestimonials = async (
    testimonials: TestimonialDto[],
    contentBlockId: number
) => {
    try {
        // Delete existing testimonials
        await testimonialrepository.delete({ content_block_id: contentBlockId });

        // Insert new testimonials
        for (const testimonial of testimonials) {
            const newTestimonial = new Testimonial();
            newTestimonial.content_block_id = contentBlockId;
            newTestimonial.name = testimonial.name;
            if(testimonial.designation) newTestimonial.designation = testimonial.designation;
            if(testimonial.company) newTestimonial.company = testimonial.company;
            newTestimonial.testimonial_text = testimonial.testimonial_text;
            if(testimonial.rating) newTestimonial.rating = testimonial.rating;
            if(testimonial.is_featured) newTestimonial.is_featured = testimonial.is_featured;
            await testimonialrepository.save(newTestimonial);
        }
    } catch (error) {
        if(error instanceof Error){
            throw error.message
        }
    }
}