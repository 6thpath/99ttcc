import type { NextFunction, Request, Response } from 'express'

export const globalErrorHandler = (err: unknown, _req: Request, res: Response<TypeApiErrorResponse>, _next: NextFunction) => {
  console.error(err)

  res.status(500).json({ error: { message: 'Internal Server Error' } })
}
