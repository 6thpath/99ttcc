import type { FindOptionsOrder } from 'typeorm'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string
      NODE_ENV?: 'development' | 'production'

      DATABASE_HOST?: string
      DATABASE_PORT?: string
      DATABASE_USER?: string
      DATABASE_PASSWORD?: string
      DATABASE_DATABASE?: string
    }
  }

  type TypeListFilterOptions = {
    offset?: number
    limit?: number
  }
  type TypeRequestParamsGeneric = Record<string, string>
  type TypeApiErrorResponse = {
    error: {
      message: string
      details?: Record<string, string>
    }
  }
  type TypeApiSuccessResponse<T = unknown> = {
    data: T
    pagination?: TypeListFilterOptions & {
      order?: FindOptionsOrder
      total: number
    }
  }
  type TypeApiResponse = TypeApiErrorResponse | TypeApiSuccessResponse

  // ? utilities
  type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
}

export {}
