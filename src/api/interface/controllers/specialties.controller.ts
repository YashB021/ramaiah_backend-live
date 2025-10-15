import { Request, Response } from "express"
import { assignSpecialtiesOnPage, createNewSpecialties, getDoctorSpecialist, getSpecialties } from "../../domain/models/specialties.model"
import { ErrorResponse, successResponse } from "../../helpers/apiResponse"

export const fetchSpecialties = async (req: Request, res: Response) => {
    try {
        getSpecialties((error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Fetch successfully.",result)
        })
    } catch (error) {
        return ErrorResponse(res, error);
    }
}


export const createSpecialties = async (req: Request, res: Response) => {
    const reqBody = req.body;
    try {
        createNewSpecialties(reqBody,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Fetch successfully.",result)
        })
    } catch (error) {
        return ErrorResponse(res, error);
    }
}

export const doctorSpecialist = async (req: Request, res: Response) => {
    const reqQuery = req.query;
    try {
        getDoctorSpecialist(reqQuery,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Fetch successfully.",result)
        })
    } catch (error) {
        return ErrorResponse(res, error);
    }
}

export const assignSpecialties = async (req: Request, res: Response) => {
    const reqBody = req.body;
    try {
        assignSpecialtiesOnPage(reqBody,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Fetch successfully.",result)
        })
    } catch (error) {
        return ErrorResponse(res, error);
    }
}


