import { Request, Response } from "express";
import { ErrorResponse, successCreated, successResponse } from "../../helpers/apiResponse";
import { createContentBlock, deleteContentBlockById, deleteContentBlockMediaById, getHomePageData, getHomePageDataAdmin, quickLinksData, updateContentBlock, updateHomePage, updateSectionById } from "../../domain/models/home.model";

export const home = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        getHomePageData((error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Home Data.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const homeAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        getHomePageDataAdmin((error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Home Data.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const homePage = async (req: Request, res: Response) => {
   const updateData = req.body.updateData;
    try {
        updateHomePage(updateData,(error:any, result:any) => {
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
export const quickLinks = async (req: Request, res: Response) => {
    try {
        quickLinksData((error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Quick link data.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const section = async (req: Request, res: Response) => {
    const sectionId = Number(req.params.sectionId);
    const updateData = req.body.updateData;
    try {
        updateSectionById(sectionId,updateData,(error:any, result:any) => {
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

export const updateContentBlockData = async (req: Request, res: Response) => {
    const sectionId = Number(req.params.sectionId);
    const updateData = req.body.updateData;
    try {
        updateContentBlock(updateData,sectionId,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Update successfully.",result)
        })
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const createContentBlockData = async (req: Request, res: Response) => {
    const sectionId = Number(req.params.sectionId);
    const contentBlockData = req.body.contentBlockData;
    try {
        createContentBlock(contentBlockData,sectionId,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Create successfully.",result)
        })
    } catch (error) {
        
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const deleteContentBlock = async (req: Request, res: Response) => {
    const contentBlockId = Number(req.params.contentBlockId);
    try {
        deleteContentBlockById(contentBlockId,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successCreated(res,result)
        })
    } catch (error) {
        
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const deleteContentBlockMedia = async (req: Request, res: Response) => {
    const contentBlockMediaId = Number(req.params.contentBlockMediaId);
    try {
        deleteContentBlockMediaById(contentBlockMediaId,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successCreated(res,result)
        })
    } catch (error) {
        
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}




