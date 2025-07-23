import express, { type NextFunction, type Request, type Response } from 'express'

import petRoutes from './routes/pet'

const app = express()

// ? middlewares
app.use(express.json())

// ? routes
app.use('/api/pets', petRoutes)

app.use((_req: Request, res: Response<TypeApiErrorResponse>) => {
  res.status(404).json({ error: { message: 'route not found' } })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: Request, res: Response<TypeApiErrorResponse>, _next: NextFunction) => {
  console.error(err)

  res.status(500).json({ error: { message: 'Internal Server Error' } })
})

export default app
