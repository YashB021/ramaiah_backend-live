import { Constants } from "../config/constants";
import { Response } from "express";

/** success created */
export const successCreated = (res: Response, msg: string) => {
  if (res.headersSent) {
    console.error("[successCreated] headers already sent, skipping response");
    return;
  }
  const dataRes = {
    status: 1,
    message: msg,
  };
  return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};

export const successResponseWithCount = (
  res: Response,
  msg: string,
  data: any,
  totalRecords: any
) => {
  if (res.headersSent) {
    console.error(
      "[successResponseWithCount] headers already sent, skipping response"
    );
    return;
  }
  const dataRes = {
    status: 1,
    message: msg,
    totalRecords,
    data,
  };
  return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};

/** success response with data */
export const successResponse = (res: Response, msg: string, data: any) => {
  if (res.headersSent) {
    console.error("[successResponse] headers already sent, skipping response");
    return;
  }
  const dataRes = {
    status: 1,
    message: msg,
    data,
  };
  return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};

/** error code */
export const ErrorResponse = (res: Response, msg: any) => {
  if (res.headersSent) {
    console.error("[ErrorResponse] headers already sent, skipping response");
    return;
  }
  const dataRes = {
    status: 0,
    message: msg,
  };
  return res.status(Constants.ERROR_CODES.FAIL_CODE).json(dataRes);
};

/** not found code */
export const notFoundResponse = (res: Response, msg: string) => {
  if (res.headersSent) {
    console.error("[notFoundResponse] headers already sent, skipping response");
    return;
  }
  const dataRes = {
    status: 0,
    message: msg,
    data: [],
  };
  return res.status(Constants.ERROR_CODES.NOT_FOUND_CODE).json(dataRes);
};

export const validationErrorWithData = (
  res: Response,
  msg: string,
  data: any
) => {
  if (res.headersSent) {
    console.error(
      "[validationErrorWithData] headers already sent, skipping response"
    );
    return;
  }
  const dataRes = {
    status: 0,
    message: msg,
    data,
  };
  return res.status(Constants.ERROR_CODES.REQUIRE_PARAMETER).json(dataRes);
};

/** for token expire */
export const unauthorizedResponse = (res: Response, msg: string) => {
  if (res.headersSent) {
    console.error(
      "[unauthorizedResponse] headers already sent, skipping response"
    );
    return;
  }
  const dataRes = {
    status: 0,
    message: msg,
  };
  return res.status(Constants.ERROR_CODES.UNAUTHORIZED_CODE).json(dataRes);
};

export const unauthorized = (res: Response, msg: string) => {
  if (res.headersSent) {
    console.error("[unauthorized] headers already sent, skipping response");
    return;
  }
  const dataRes = {
    status: 0,
    message: msg,
  };
  return res.status(Constants.ERROR_CODES.UNAUTHORIZED).json(dataRes);
};

export const userExistsError = (res: Response, msg: string) => {
  if (res.headersSent) {
    console.error("[userExistsError] headers already sent, skipping response");
    return;
  }
  const dataRes = {
    status: 0,
    message: msg,
  };
  return res.status(Constants.ERROR_CODES.USER_EXISTS).json(dataRes);
};
