import { DataSource } from 'typeorm'

import { PetModel } from '../models'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: [PetModel],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: false,
})
