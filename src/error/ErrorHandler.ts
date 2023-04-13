import { StatusCodes as Status } from 'http-status-codes'

class AppError extends Error {
  private readonly _message: string
  private readonly _statusCode: number

  constructor (message: string, statusCode?: number) {
    super()
    this._message = message
    this._statusCode = statusCode ?? Status.BAD_REQUEST
  }

  getMessage (): string {
    return this._message
  }

  getStatusCode (): number {
    return this._statusCode
  }
}

export {
  AppError,
  Status
}
