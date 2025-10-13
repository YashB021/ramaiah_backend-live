import { Request, Response } from "express";
import { ErrorResponse, successResponse } from "../../helpers/apiResponse";
import { bulkUpdateSiteSettings, deleteSiteSettings, getSiteSettings, headerData, uploadMediaOfSiteSettings } from "../../domain/models/site.settings.model";

export const settings = async (req: Request, res: Response) => {
    const query = req.query;
    try {
        getSiteSettings(query,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Get site settings.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const bulkUpdateSettingsHandler  = async (req: Request, res: Response) => {
   const settingsArray = req.body.settings; 
    try {
        bulkUpdateSiteSettings(settingsArray,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Update successfully.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const deleteSettings = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        deleteSiteSettings(Number(id),(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Update successfully.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const uploadFile = async (req: Request, res: Response) => {
    const reqFile = req.file;
    if (!reqFile) {
        return ErrorResponse(res, "No file uploaded");
    }
    try {
        uploadMediaOfSiteSettings(reqFile,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Upload successfully.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const header = async (req: Request, res: Response) =>{
    const query = req.query;
    try {
        headerData(query,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Upload successfully.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}