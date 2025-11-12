import { Request, Response } from "express";
import { ErrorResponse, successResponse } from "../../helpers/apiResponse";
import { createCombinedContent } from "../../domain/models/combined.model";

export const createCombined = async (req: Request, res: Response) => {
    try {
        const { type, data } = req.body;
        
        // Validate required fields
        if (!type) {
            return ErrorResponse(res, "Type is required");
        }
        
        if (!data) {
            return ErrorResponse(res, "Data is required");
        }
        
        // Validate type
        const validTypes = ['page', 'section', 'content_block'];
        if (!validTypes.includes(type)) {
            return ErrorResponse(res, "Invalid type. Must be one of: page, section, content_block");
        }
        
        createCombinedContent(type, data, (error: any, result: any) => {
            if (error) {
                return ErrorResponse(res, error);
            }
            return successResponse(res, "Created successfully", result);
        });
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }   
};
