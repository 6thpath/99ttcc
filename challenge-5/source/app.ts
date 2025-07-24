import express from 'express'

import petRoutes from './routes/pet'
import { globalErrorHandler } from './middlewares/error'
import { notFoundRouteHandler } from './routes/not-found'

const app = express()

// ? middlewares
app.use(express.json())

// ? routes
app.use('/api/pets', petRoutes)
app.use(notFoundRouteHandler)
app.use(globalErrorHandler)

export default app
