import { Handler, NextFunction, Request, Response } from "express";
import { ApiError } from "../helper/api-error";

export const erro = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500
  console.log(error.statusCode);
  const message = error.statusCode ? error.message : 'Erro interno do Servidor'
  return res.status(statusCode).json({message});
 
// if (error.statusCode){
//   const message = error.statusCode
//   error.message
//   return res.status(statusCode).json({message})
//   }else{
//   res.json({'Erro interno do Servidor': error.message})
// }next();

};

//adaptador da rota

export const resolver = (handlerFn: Handler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await Promise.resolve(handlerFn(req, res, next));
    } catch (e) {
      return next(e);
    }
  }
}
