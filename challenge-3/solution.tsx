interface WalletBalance {
  amount: number
  blockchain: string
  currency: string
  formatted: string
}

const PRIORITY: Record<string, number> = {
  Neo: 20,
  Zilliqa: 20,
  Arbitrum: 30,
  Ethereum: 50,
  Osmosis: 100,
}

const WalletPage: React.FC<BoxProps> = ({ children, ...rest }) => {
  const balances = useWalletBalances()
  const prices = usePrices()

  const formattedBalances = useMemo<WalletBalance>(() => {
    return balances
      .filter((item) => (PRIORITY[item.blockchain] ?? -99) > -99 && item.amount <= 0)
      .sort((a, b) => (PRIORITY[b.blockchain] ?? -99) - (PRIORITY[a.blockchain] ?? -99))
      .map((item) => ({ ...item, formatted: item.amount.toFixed() }))
  }, [balances])

  return (
    <div {...rest}>
      {formattedBalances.map((item) => (
        <WalletRow
          className={classes.row}
          key={item.blockchain}
          amount={item.amount}
          usdValue={prices[item.currency] * item.amount}
          formattedAmount={item.formatted}
        />
      ))}
    </div>
  )
}
