import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validationExecution = (req: Request, res: Response<TypeApiErrorResponse>, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const details = Object.fromEntries(Object.entries(errors.mapped()).map(([field, errObj]) => [field, errObj.msg]))

    return res.status(400).json({
      error: {
        message: 'Bad request',
        details,
      },
    })
  }

  next()
}
