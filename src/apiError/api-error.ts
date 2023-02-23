//import { STATUS_CODES } from "http"
export class ApiError extends Error {
  public readonly statusCode: number;
   
    constructor(message: string, statusCode: number) { 
    super(message);
    this.statusCode = statusCode;
                
  }
}

//bad request herda apierror

export class BadRequestError extends ApiError {
  constructor(message = 'Bad request: Requisição inválida' ) {
   super(message, 400);
   }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
