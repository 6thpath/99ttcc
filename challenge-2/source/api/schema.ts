import { z } from 'zod'

export const tokenSchema = z.object({
  address: z.string(),
  currency: z.string(),
  date: z.string(),
  price: z.number(),
})
export type Token = z.output<typeof tokenSchema>

export const tokenSwapFormSchema = z
  .object({
    fromToken: tokenSchema,
    fromBalance: z.number(),
    fromValue: z.number().gt(0),
    toToken: tokenSchema,
    toBalance: z.number(),
    toValue: z.number().gt(0),
    slippage: z.number().check((context) => {
      if (context.value > 100 || context.value < 0) {
        context.issues.push({
          code: 'custom',
          message: 'Invalid slippage value',
          input: context.value,
        })
      }
    }),
    deadline: z.number(),
  })
  .check((context) => {
    if (context.value.fromValue > context.value.fromBalance) {
      context.issues.push({
        code: 'custom',
        path: ['fromValue'],
        message: 'Value must be lower or equal to balance',
        input: context.value.fromValue,
      })

      return z.NEVER
    }
  })
export type TokenSwapForm = z.input<typeof tokenSwapFormSchema>
export type TokenSwapFormData = z.output<typeof tokenSwapFormSchema>
