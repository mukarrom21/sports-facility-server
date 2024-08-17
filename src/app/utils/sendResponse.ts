import { Response } from "express";

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
}

// define a utility function to send responses
const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    data: data?.data,
  });
};

export default sendResponse;
