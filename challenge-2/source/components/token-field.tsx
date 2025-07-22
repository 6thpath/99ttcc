import NumberFlow from '@number-flow/react'
import { Button, Group, Input, NumberField } from 'react-aria-components'
import { type Control, useController, type UseFormGetValues, type UseFormSetValue, useWatch } from 'react-hook-form'

import type { Token, TokenSwapForm } from '@/api'
import { TokenSelect } from '@/components/token-select'

const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

type Props = {
  context: 'from' | 'to'
  id: HTMLLabelElement['id']
  labelText: string
  control: Control<TokenSwapForm>
  getValues: UseFormGetValues<TokenSwapForm>
  setValue: UseFormSetValue<TokenSwapForm>
}

export const TokenField: React.FC<Props> = ({ context, id, labelText, control, getValues, setValue }) => {
  const isFromContext = context === 'from'

  const {
    field: { value: selectedToken, onChange: onTokenChange, onBlur },
    formState: { isSubmitting },
  } = useController({ control, name: isFromContext ? 'fromToken' : 'toToken' })
  const {
    field: { ref, value: fieldValue, onChange: fieldValueChange },
  } = useController({ control, name: isFromContext ? 'fromValue' : 'toValue' })
  const balance = useWatch({ control, name: isFromContext ? 'fromBalance' : 'toBalance' }) ?? 0
  const otherToken = useWatch({ control, name: isFromContext ? 'toToken' : 'fromToken' })

  const updateToValue = () => {
    const fromToken = getValues('fromToken')
    const fromValue = getValues('fromValue')
    const toToken = getValues('toToken')
    const toValue = getValues('toValue')

    if (!fromToken || !toToken) {
      return
    }

    if (toValue && !fromValue) {
      const toWorth = toValue * toToken.price - 0.1
      const fromValue = toWorth / fromToken.price
      setValue('fromValue', fromValue, { shouldValidate: true })

      if (fromValue > balance) {
        const fromWorthMax = balance * fromToken.price
        const toValue = fromWorthMax / toToken.price
        setValue('toValue', toValue, { shouldValidate: true })
      }
    } else {
      const fromWorth = fromValue * fromToken.price - 0.1
      const toValue = fromWorth / toToken.price
      setValue('toValue', toValue, { shouldValidate: true })
    }
  }

  const handleTokenChange = (token: Token) => {
    onTokenChange(token)
    setValue(isFromContext ? 'fromBalance' : 'toBalance', Math.random() * 1000, { shouldValidate: true })
    updateToValue()
  }

  const handleValueInputBlur = () => {
    onBlur?.()
    updateToValue()
  }

  const handleSetMax = () => {
    fieldValueChange(balance)
    updateToValue()
  }

  const usdValue = Number.isNaN(fieldValue) ? 0 : (fieldValue ?? 0) * (selectedToken?.price ?? 0)

  return (
    <div
      className={[
        'glass-box-secondary',
        'flex w-full flex-col gap-1 overflow-hidden rounded-xl p-3',
        'outline-2 outline-offset-2 outline-transparent',
        '[&:has(input:focus-visible)]:outline-sky-600/95',
        'transition-colors',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-4">
        <label className="w-full font-serif font-semibold" htmlFor={id}>
          {labelText}
        </label>
        <div className="flex items-center gap-1 font-serif text-sm">
          <span className="font-semibold">Balance:</span>
          <NumberFlow
            className="tracking-wider"
            value={balance}
            format={{ compactDisplay: 'long', maximumFractionDigits: 8 }}
          />
        </div>
      </div>

      <div className="flex w-full items-center gap-2">
        <NumberField
          className="w-full"
          id={id}
          minValue={0}
          maxValue={isFromContext ? balance : undefined}
          formatOptions={{
            useGrouping: true,
            maximumFractionDigits: 16,
            roundingPriority: 'morePrecision',
          }}
          value={fieldValue}
          isDisabled={isSubmitting}
          onChange={fieldValueChange}
          onBlur={handleValueInputBlur}
        >
          <Group className="flex justify-evenly gap-0.5">
            <Input
              ref={ref}
              className="w-full pr-2 text-xl font-medium tracking-wider text-white"
              placeholder="0,0"
              data-variant="ghost"
            />

            {isFromContext && (
              <div className="flex h-full min-w-5 flex-col">
                <Button
                  className="flex aspect-square h-full items-center justify-center rounded-t-md font-medium"
                  data-variant="primary"
                  slot="increment"
                >
                  +
                </Button>
                <Button
                  className="flex aspect-square h-full items-center justify-center rounded-b-md font-medium"
                  data-variant="primary"
                  slot="decrement"
                >
                  -
                </Button>
              </div>
            )}
          </Group>
        </NumberField>

        {isFromContext && (
          <button
            className="inline-flex rounded-md p-2 font-medium"
            data-variant="primary"
            type="button"
            disabled={!selectedToken || isSubmitting}
            onClick={handleSetMax}
          >
            Max
          </button>
        )}

        <TokenSelect
          excludeTokens={[otherToken]}
          value={selectedToken}
          isDisabled={isSubmitting}
          onSelect={handleTokenChange}
        />
      </div>

      <p className="text-xs tracking-wider text-slate-300/80">~{usd(usdValue)}</p>
    </div>
  )
}
