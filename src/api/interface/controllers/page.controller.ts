import { Request, Response } from "express";
import { ErrorResponse, successResponse } from "../../helpers/apiResponse";
import { createPage, deactivatePage, getPagesData, getPagesDataById, updatePageById } from "../../domain/models/page.model";

export const page = async(req: Request, res: Response)=>{
  try {
    const reqBody = req.body;
    createPage(reqBody,(error:any, result:any) => {
      if(error){
        return ErrorResponse(res, error)
      }
      return successResponse(res,"Page created",result)
    })
  } catch (error) {
    if(error instanceof Error){
      return ErrorResponse(res,error.message)
    }
  }
}

export const getPages = async(req: Request, res: Response)=>{
  try {
    getPagesData((error:any, result:any) => {
      if(error){
        return ErrorResponse(res, error)
      }
      return successResponse(res,"Page created",result)
    })
  } catch (error) {
    if(error instanceof Error){
      return ErrorResponse(res,error.message)
    }
  }
}


export const getPageById = async(req: Request, res: Response)=>{
  const {pageId } = req.params
  try {
    getPagesDataById(Number(pageId),(error:any, result:any) => {
      if(error){
        return ErrorResponse(res, error)
      }
      return successResponse(res,"Page created",result)
    })
  } catch (error) {
    if(error instanceof Error){
      return ErrorResponse(res,error.message)
    }
  }
}

export const updatePage = async(req: Request, res: Response)=>{
  const {pageId } = req.params
  const reqBody = req.body;
  try {
    updatePageById(Number(pageId),reqBody,(error:any, result:any) => {
      if(error){
        return ErrorResponse(res, error)
      }
      return successResponse(res,"Page created",result)
    })
  } catch (error) {
    if(error instanceof Error){
      return ErrorResponse(res,error.message)
    }
  }
}

export const deactive = async(req: Request, res: Response)=>{
  const {pageId } = req.params;
  
  try {
    deactivatePage(Number(pageId),(error:any, result:any) => {
      if(error){
        return ErrorResponse(res, error)
      }
      return successResponse(res,"Page created",result)
    })
  } catch (error) {
    if(error instanceof Error){
      return ErrorResponse(res,error.message)
    }
  }
}
