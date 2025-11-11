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
    console.log('=== updateContentBlockMedia called ===');
    console.log('mediaData:', JSON.stringify(mediaData, null, 2));
    console.log('contentBlockId:', contentBlockId);
    for (const item of mediaData) {
      console.log('Processing media item:', JSON.stringify(item, null, 2));
      // Skip background images
      if (item.media_type === 'background') {
        continue;
      }

      // Get media_file_id for alt_text update
      const mediaFileId = item.media_file_id || item.media_file?.id;
      
      // Get alt_text from either direct field or media_file object
      const altText = item.alt_text !== undefined ? item.alt_text : item.media_file?.alt_text;
      
      // Update alt_text in media_files table if provided
      if (mediaFileId && altText !== undefined) {
        console.log('Updating alt_text for media_file_id:', mediaFileId, 'alt_text:', altText);
        await mediaRepository.update(
          { id: mediaFileId },
          { alt_text: altText }
        );
        console.log('Alt text updated successfully');
      }

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

        // If new media file is being added with alt_text
        const altTextForNew = item.alt_text !== undefined ? item.alt_text : item.media_file?.alt_text;
        if (mediaFileId && altTextForNew !== undefined) {
          console.log('Updating alt_text for new media_file_id:', mediaFileId, 'alt_text:', altTextForNew);
          await mediaRepository.update(
            { id: mediaFileId },
            { alt_text: altTextForNew }
          );
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  }
};