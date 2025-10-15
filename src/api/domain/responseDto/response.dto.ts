// src/types/homePage.ts

export interface MediaFileDto {
  id?: number; // existing file (optional if creating new one)
  filename?: string;
  original_filename?: string;
  file_path?: string;
  file_url: string;
  // file_type: "image" | "video" | "document" | "audio";
  mime_type?: string;
  file_size?: number;
  width?: number;
  height?: number;
  duration?: number;
  alt_text?: string;
  caption?: string;
  uploaded_by?: number;
  media_type: "image" | "video" | "file";
}

export interface ContentBlockMediaDto {
  id?: number; // for update
  content_block_id?: number; // usually handled in backend
  media_file_id: number; // relation with MediaFile
  media_type?: "primary" | "background" | "icon" | "thumbnail" | "gallery";
  display_order?: number;
  media_file?: MediaFileDto; // optional, when we want to populate details
}

export interface StatisticDto {
  id?: number;
  statistic_text?: string;
  number: string;
  label: string;
  suffix?: string;
  icon_class?: string;
  color?: string;
  animation_delay?: number;
  statistics_image?: string;
}

export interface TestimonialDto {
  id?: number;
  name: string;
  designation?: string;
  company?: string;
  testimonial_text: string;
  rating?: number;
  is_featured?: boolean;
}

export interface AccreditationDto {
  id?: number;
  name: string;
  description?: string;
  year_achieved?: number;
  is_active?: boolean;
}

export interface ButtonDto {
  id?: number;
  text: string;
  url?: string;
  button_type?: "primary" | "secondary" | "outline" | "link";
  size?: "small" | "medium" | "large";
  target?: "_self" | "_blank" | "_parent" | "_top";
  icon_class?: string;
}

export interface FAQDto {
  id?: number;
  question: string;
  answer: string;
  category?: string;
  is_active?: boolean;
  display_order?: number;
}

export interface ContentBlockDto {
  id?: number;
  is_active?:boolean;
  block_type:
    | "text"
    | "image"
    | "video"
    | "button"
    | "icon"
    | "statistic"
    | "testimonial"
    | "accreditation"
    | "doctor"
    | "treatment"
    | "facility"
    | "custom";
  title?: string;
  content?: string;
  subtitle?: string;
  description?: string;
  display_order: number;
  alignment?: "left" | "center" | "right";
  width_percentage?: number;
  media_files?: MediaFileDto[];
  statistics?: StatisticDto[];
  testimonials?: TestimonialDto[];
  accreditations?: AccreditationDto[];
  buttons?: ButtonDto[];
  faqs?: FAQDto[];
  status?: boolean;
}

export interface SectionDto {
  id?: number;
  name: string;
  page_id?: number,
  title?: string;
  subtitle?: string;
  description?: string;
  is_active?: boolean;
  section_type:
    | "hero"
    | "testimonials"
    | "statistics"
    | "accreditations"
    | "legacy"
    | "journey"
    | "cta"
    | "doctors"
    | "treatments"
    | "facilities"
    | "faq"
    | "custom";
  display_order?: number;
  background_color?: string;
  text_color?: string;
  padding_top?: number;
  padding_bottom?: number;
  margin_top?: number;
  margin_bottom?: number;
  content_blocks?: ContentBlockDto[];
}

export interface UpdateHomePageDto {
  title?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  sections?: SectionDto[];
}


export interface DoctorDto {
  first_name: string;
  last_name: string;
  slug: string;
  designation?: string;
  qualifications?: string;
  experience_years?: number;
  specializations?: string;
  about?: string;
  achievements?: string;
  languages?: string;
  consultation_fee?: number;
  is_active?: boolean;
  is_featured?: boolean;
  display_order?: number;
  specialty_ids?: number[]; // ✅ IDs of specialties to attach
}