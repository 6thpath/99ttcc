import { Request, Response } from 'express'

export const notFoundRouteHandler = (_req: Request, res: Response<TypeApiErrorResponse>) => {
  res.status(404).json({ error: { message: 'route not found' } })
}
