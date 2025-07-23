import './config/env'

import app from './app'
import { AppDataSource } from './config/db'

const PORT = process.env.PORT || 4096

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(console.error)
