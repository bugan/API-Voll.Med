import { AppError, Status } from '../error/ErrorHandler.js'

export default async (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.getStatusCode()).json({
      status: error.getStatusCode(),
      message: error.getMessage()
    })
  }

  return res.status(Status.INTERNAL_SERVER_ERROR).json({
    status: Status.INTERNAL_SERVER_ERROR,
    message: `Internal server error: ${error.message}`
  })
}
