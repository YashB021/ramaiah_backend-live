import { Request, Response } from "express";
import { ErrorResponse, successResponse } from "../../helpers/apiResponse";
import { loginApi, registerUser } from "../../domain/models/user.model";

export const register = async (req: Request, res: Response) => {
    const { username, email, password, firstName, lastName } = req.body;
    try {
        registerUser(req.body,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Register successfully.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        loginApi(email,password,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Login successfully.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}