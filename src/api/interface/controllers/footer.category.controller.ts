import { Request, Response } from "express";
import { ErrorResponse, successResponse } from "../../helpers/apiResponse";
import { getFooterCategories } from "../../domain/models/footer.category.model";

export const footerCategory = async (req: Request, res: Response) => {
    try {
        getFooterCategories((error, result) => {
            if (error) {
                return ErrorResponse(res, error);
            }
            return successResponse(res, "Footer categories fetched successfully", result);
        })
    } catch (error) {
        if(error instanceof Error){
            return ErrorResponse(res, error)
        }
    }
}