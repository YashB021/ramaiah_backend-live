import { Request, Response } from "express";
import { ErrorResponse, successCreated, successResponse } from "../../helpers/apiResponse";
import { createMainMenu, createNavigationItem, createNavPageItemMenu, deleteMenuitem, getadminMenus, getMenuItemsById, getMenus, getNavigationMenu, getSideBarMenu, updateMenuitem } from "../../domain/models/navigation.menu.model";

export const createMenu = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        createMainMenu(reqBody,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"create navigation.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const getMenu = async (req: Request, res: Response) => {
    try {
        getMenus((error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Menus lists.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const menus = async (req: Request, res: Response) => {
    try {
        getNavigationMenu((error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Navigation menu lists.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const adminmenus = async (req: Request, res: Response) => {
    try {
        getadminMenus((error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Navigation menu lists.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const sidebarMenu = async (req: Request, res: Response) => {
    try {
        getSideBarMenu((error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Sidebar menu lists.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const createM = async (req: Request, res: Response) => {
    const reqBody = req.body;
    try {
        createNavigationItem(reqBody,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Navigation menu lists.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const createNavItemPageM = async (req: Request, res: Response) => {
    const reqBody = req.body;
    try {
        createNavPageItemMenu(reqBody,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Navigation menu lists.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}


export const getMenuItem = async (req: Request, res: Response) => {
    const menuItemId = Number(req.params.id);
    try {
        getMenuItemsById(menuItemId,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Get menu tems.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const updateitem = async (req: Request, res: Response) => {
    const reqBody = req.body;
    const menuId = Number(req.params.id);
    try {
        updateMenuitem(menuId,reqBody,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successResponse(res,"Update successfully.",result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    const menuitemId = Number(req.params.id);
    try {
        deleteMenuitem(menuitemId,(error:any, result:any) => {
            if(error){
                return ErrorResponse(res,error)
            }
            return successCreated(res, result)
        })
    } catch (error) {
        if (error instanceof Error) {
            return ErrorResponse(res, error.message);
        }
    }
}


