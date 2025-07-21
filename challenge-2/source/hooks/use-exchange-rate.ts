import { useQuery } from '@tanstack/react-query'

import { type Token, getExchangeRate } from '@/api'

export const useExchangeRate = () => {
  return useQuery({
    initialData: [],
    queryKey: [getExchangeRate.cacheKey],
    queryFn: async () => {
      const result = await getExchangeRate()

      if (result.status !== 200) {
        return []
      }

      const jsonResponse = (await result.json()) as Token[]

      // ? add record id because currency symbol could not be an id
      const list = jsonResponse.map((token, index) => ({ ...token, address: `0x${index}` }))

      setTimeout(() => {}, 2000)

      return list
    },
  })
}
