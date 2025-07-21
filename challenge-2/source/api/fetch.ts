export const getExchangeRate = () => {
  return fetch('https://interview.switcheo.com/prices.json', { method: 'GET' })
}
getExchangeRate.cacheKey = 'token-exchange-rate'
