import { Request, Response } from "express";
import { ErrorResponse, successResponse } from "../../helpers/apiResponse";
import { getFooterCategories } from "../../domain/models/footer.category.model";
import { addFooterContent, updateFooterContent } from "../../domain/models/footer.content.model";

export const footerContent = async (req: Request, res: Response) => {
    const reqBody = req.body;
    try {
        addFooterContent(reqBody,(error, result) => {
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
export const footerContentUpdate = async (req: Request, res: Response) => {
    const reqBody = req.body;
    const id = req.params.id;
    try {
        updateFooterContent(id,reqBody,(error, result) => {
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
