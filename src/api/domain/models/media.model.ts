import { AppDataSource } from "../../config/db";
import { ContentBlockMedia } from "../entities/content.block.media.entities";
import { MediaFile } from "../entities/media.files.entities";
import { MediaFileDto } from "../responseDto/response.dto";

const contentBlockMediaRepository = AppDataSource.getRepository(ContentBlockMedia);
const mediaRepository = AppDataSource.getRepository(MediaFile);

export const updateContentBlockMedia = async (
//   mediaData: Array<{
//     id?: number; // if exists, update
//     media_file_id: number;
//     media_type?: 'primary' | 'background' | 'icon' | 'thumbnail' | 'gallery';
//     display_order?: number;
//   }>,
//   contentBlockId: number

mediaData: any, // MediaFileDto[],
contentBlockId: number
) => {
  try {
    for (const item of mediaData) {
    if (item.id) {
      // Update existing
      await contentBlockMediaRepository.update(
        { id: item.id, content_block_id: contentBlockId },
        {
          media_file_id: item.media_file_id,
          media_type: item.media_type || 'primary',
          display_order: item.display_order || 0,
        }
      );
    } else {
      // Insert new
      const newMedia = contentBlockMediaRepository.create({
        content_block_id: contentBlockId,
        media_file_id: item.media_file_id,
        media_type: item.media_type || 'primary',
        display_order: item.display_order || 0,
      });
      await contentBlockMediaRepository.save(newMedia);
    }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  }
};