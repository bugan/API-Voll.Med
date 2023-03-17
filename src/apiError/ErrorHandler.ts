import { type Handler, type NextFunction, type Request, type Response } from 'express'
import { type ApiError } from './api-error'

export const erro = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Erro interno do Servidor'
  return res.status(statusCode).json({ message })
}

// adaptador da rota

export const resolver = (handlerFn: Handler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.resolve(handlerFn(req, res, next)); return
    } catch (e) {
      next(e)
    }
  }
}
