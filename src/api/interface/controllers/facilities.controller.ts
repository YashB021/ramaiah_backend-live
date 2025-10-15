import { Request, Response } from "express";
import { ErrorResponse, successResponse } from "../../helpers/apiResponse";
import { createFacilityApi, deleteFacilityApi, getFacilityApi, getFacilitysApi, updateFacilityApi, updateServiceFacility } from "../../domain/models/facilities.model";

export const createFacility = async(req: Request, res: Response)=>{
    const reqBody = req.body;
    try {
        createFacilityApi(reqBody,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Facility created successfully.", result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res,error);
        }
    }
}

export const getFacilitys = async(req: Request, res: Response)=>{
    try {
        getFacilitysApi((error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Facility created successfully.", result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res,error);
        }
    }
}

export const getFacility = async(req: Request, res: Response)=>{
    const {id} = req.params;
    try {
        getFacilityApi(Number(id),(error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Facility created successfully.", result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res,error);
        }
    }
}


export const updateFacility = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const reqBody = req.body;
    try {
        updateFacilityApi(Number(id),reqBody,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Facility created successfully.", result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res,error);
        }
    }
}

export const deleteFacility = async(req: Request, res: Response)=>{
    const {id} = req.params;
    try {
        deleteFacilityApi(Number(id), (error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Facility created successfully.", result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res,error);
        }
    }
}

export const servicesFacility = async(req: Request, res: Response)=>{
    const reqBody = req.body;
    try {
        updateServiceFacility(reqBody, (error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Facility Update successfully.", result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res,error);
        }
    }
}
