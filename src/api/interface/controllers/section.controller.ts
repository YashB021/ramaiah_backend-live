import { Request, Response } from "express";
import { ErrorResponse, successResponse } from "../../helpers/apiResponse";
import { createSectionData, deleteSectionById, getSectionData, getSectionsListById } from "../../domain/models/section.model";

export const createSection = async(req: Request, res: Response) => {
    const sectionData = req.body 
    try {
        createSectionData(sectionData,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Section Data",result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res,error.message)
        }
    }
}

export const sectionsLists = async(req: Request, res: Response) => {
    const {pageId} = req.params 
    
    try {
        getSectionsListById(Number(pageId),(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Section Data",result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res,error.message)
        }
    }
}

export const deleteSection = async(req: Request, res: Response) => {
    const {id} = req.params 
    try {
        deleteSectionById(Number(id),(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Section Data",result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res,error.message)
        }
    }
}

export const getSection = async(req: Request, res: Response) => {
    const sectionType = req.params.sectionType; 
    try {
        getSectionData(sectionType,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Section Data",result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res,error.message)
        }
    }
}