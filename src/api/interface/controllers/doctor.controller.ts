import { getDoctorDetailsBySlug } from "../../domain/models/doctor.model";
import { Request, Response } from "express";
import { ErrorResponse, successResponse } from "../../helpers/apiResponse";
import { addExpertContentBlockWise, createDoctorApi, getDoctorDetailsById } from "../../domain/models/doctor.model";

export const createDoctor = async(req: Request, res: Response) => {
    const reqBody = req.body;
    try {
        createDoctorApi(reqBody,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Fetch successfully.",result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res, error)
        }
    }
}

export const addExpert = async(req: Request, res: Response) => {
    // payload
    // {
    //     "content_block_id": 12,
    //     "doctor_specialty_ids": [5, 7, 9]
    // }

    const reqBody = req.body;
    try {
        addExpertContentBlockWise(reqBody,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res,"Add successfully.",result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res, error)
        }
    }
}


export const getDoctorById = async(req: Request, res: Response) => {
    const doctorId = req.params.id;
    try {
        getDoctorDetailsById(Number(doctorId),(error:any, result:any) => {
            if(error){
                return ErrorResponse(res, error)
            }
            return successResponse(res, "Fetch successfully.",result)
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res, error)
        }
    }
}


export const getDoctorBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
      getDoctorDetailsBySlug(slug, (error: any, result: any) => {
        if (error) return ErrorResponse(res, error);
        return successResponse(res, "Doctor details fetched", result);
      });
    } catch (error) {
      if (error instanceof Error) return ErrorResponse(res, error.message);
    }
  };