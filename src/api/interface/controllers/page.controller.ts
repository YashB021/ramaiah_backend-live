import { Request, Response } from "express";
import { ErrorResponse, successResponse } from "../../helpers/apiResponse";
import { getPageDataBySlug } from "../../domain/models/page.model";
import { transformContentBlocks } from "../../domain/models/home.model";
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


export const getPageBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
      getPageDataBySlug(slug, (error: any, result: any) => {
          if (error) {
              return ErrorResponse(res, error);
          }
          
          // Transform the data similar to how home page does it
          const activeSections = result.sections
              .filter((section: any) => section.is_active)
              .sort((a: any, b: any) => a.display_order - b.display_order);
          
          const transformedSections = activeSections.map((section: any) => ({
              id: section.id,
              name: section.name,
              title: section.title,
              subtitle: section.subtitle,
              description: section.description,
              section_type: section.section_type,
              display_order: section.display_order,
              background_color: section.background_color,
              text_color: section.text_color,
              padding_top: section.padding_top,
              padding_bottom: section.padding_bottom,
              margin_top: section.margin_top,
              margin_bottom: section.margin_bottom,
              content_blocks: transformContentBlocks(section.content_blocks || [])
          }));

          const responseData = {
              id: result.id,
              slug: result.slug,
              title: result.title,
              meta_title: result.meta_title,
              meta_description: result.meta_description,
              meta_keywords: result.meta_keywords,
              page_type: result.page_type,
              sections: transformedSections
          };

          return successResponse(res, "Page data retrieved successfully", responseData);
      });
  } catch (error) {
      if (error instanceof Error) {
          return ErrorResponse(res, error.message);
      }
  }
};