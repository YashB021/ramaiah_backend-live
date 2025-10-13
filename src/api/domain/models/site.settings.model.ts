import { In } from "typeorm";
import { AppDataSource } from "../../config/db";
import { HeaderLevel, SettingType, SiteSetting } from "../entities/site.settings.entities";
import { MediaFile } from "../entities/media.files.entities";
import cloudinary from "../../helpers/utility";

const siteSettingRepo = AppDataSource.getRepository(SiteSetting);
const mediaFileRepository = AppDataSource.getRepository(MediaFile);

export const getSiteSettings = async (
    query: any,
    callback:(error:any, result:any) => void
)=>{
    try {
        const { isPublic, headerLevel, includeDeleted } = query;

        const where: any = {};

        if (isPublic !== undefined) {
            where.isPublic = isPublic === "true";
        }

        // If headerLevel is passed and valid, use it; otherwise, use both values
        if (headerLevel && [HeaderLevel.LEVEL_ONE, HeaderLevel.LEVEL_TWO].includes(headerLevel)) {
            where.header_level = headerLevel;
        } else {
             where.header_level = In(["level_one", "level_two"]);
        }

        if (!includeDeleted || includeDeleted === "false") {
            where.deleted_at = null; // Exclude deleted records
        }

        const settings = await siteSettingRepo.find({ where });

        return callback(null,settings);
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}

export const bulkUpdateSiteSettings = async (
  settingsArray: any[], // Array of settings {id, setting_value, ...}
  callback: (error: any, result: any) => void
) => {
  try {
    if (!Array.isArray(settingsArray) || settingsArray.length === 0) {
      return callback("No settings provided", null);
    }

    const updatedSettings = [];

    for (const settingData of settingsArray) {
      const { id, setting_key, setting_value, setting_type, header_level, description, is_public, status } = settingData;

      const setting = await siteSettingRepo.findOne({ where: { id: Number(id) } });
      if (!setting) {
        console.warn(`Setting with id ${id} not found, skipping...`);
        continue; // Skip missing settings
      }

      // Update only provided fields
      if (setting_key !== undefined) setting.setting_key = setting_key;
      if (setting_value !== undefined) setting.setting_value = setting_value;
      if (setting_type !== undefined) setting.setting_type = setting_type;
      if (header_level !== undefined) setting.header_level = header_level;
      if (description !== undefined) setting.description = description;
      if (is_public !== undefined) setting.is_public = is_public;
      if (status !== undefined) setting.status = status;


      await siteSettingRepo.save(setting);
      updatedSettings.push(setting);
    }

    return callback(null, updatedSettings);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return callback(error.message, null);
    }
  }
};

export const deleteSiteSettings = async (
    id: number,
    callback:(error:any, result:any) => void
)=>{
    try {
        const setting = await siteSettingRepo.findOne({ where: { id: Number(id) } });
        if (!setting) {
            return callback("Setting not found",null)
        }

        setting.deleted_at = new Date();
        await siteSettingRepo.save(setting);

        return callback(null,"Setting deleted successfully");
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}

export const uploadMediaOfSiteSettings = async (
    reqFile: Express.Multer.File,
    callback:(error:any, result:any) => void
) => {
    try {
        if (!reqFile) {
            return callback("No file uploaded",null)
        }

        const isSVG = reqFile.mimetype === "image/svg+xml";

        const result = await cloudinary.uploader.upload(reqFile.path, {
            folder: "site_settings",
            resource_type: "auto",
            format: isSVG ? "svg" : undefined,
            transformation: isSVG ? [{ flags: "sanitize" }] : undefined,
            use_filename: true,
            unique_filename: true,
        });

        const cloudinaryPath = result.secure_url; 

        // Extract only the path after `/upload/`
        const baseIndex = cloudinaryPath.indexOf("/upload/") + "/upload/".length;
        const relativePath = cloudinaryPath.substring(baseIndex); 
        console.log("relativePath...",relativePath);

        // Create media entity
        const mediaFile = new MediaFile();
        mediaFile.filename = result.public_id;
        mediaFile.original_filename = reqFile.originalname || result.original_filename;
        mediaFile.file_path = result.secure_url;
        mediaFile.file_url = result.secure_url;
        mediaFile.file_type = detectFileType(reqFile.mimetype);
        mediaFile.mime_type = reqFile.mimetype;
        mediaFile.file_size = reqFile.size;
        // mediaFile.width = result.width || null;
        // mediaFile.height = result.height || null;
        // mediaFile.duration = result.duration || null;
        // mediaFile.alt_text = reqFile.originalname || null;
        mediaFile.caption = null;

    const savedMedia = await mediaFileRepository.save(mediaFile);

    return callback(null, {
      message: "File uploaded successfully",
    //   filePath: relativePath,
      filePath:result.secure_url,
      savedMedia
    });
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}

// 🔹 helper to detect file type
function detectFileType(mimeType: string): "image" | "video" | "document" | "audio" {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  return "document";
}

export const headerData = async (
    query: any,
    callback:(error:any, result:any) => void
)=>{
    try {
        const { isPublic, headerLevel, includeDeleted } = query;

        const where: any = {};

        if (isPublic !== undefined) {
            where.isPublic = isPublic === "true";
        }

        // If headerLevel is passed and valid, use it; otherwise, use both values
        if (headerLevel && [HeaderLevel.LEVEL_ONE, HeaderLevel.LEVEL_TWO].includes(headerLevel)) {
            where.header_level = headerLevel;
        } else {
             where.header_level = In(["level_one", "level_two"]);
        }

        if (!includeDeleted || includeDeleted === "false") {
            where.deletedAt = null; // Exclude deleted records
        }

        const settings = await siteSettingRepo.find({ where });

        return callback(null,settings);
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}