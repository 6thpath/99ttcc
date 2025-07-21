import NumberFlow from '@number-flow/react'
import { useMemo } from 'react'
import { type Control, useFormState, useWatch } from 'react-hook-form'

import type { TokenSwapForm } from '@/api'
import { IconAlert } from '@/components/icons'

type Props = {
  control: Control<TokenSwapForm>
}

export const Summary: React.FC<Props> = ({ control }) => {
  const { errors } = useFormState({ control })
  const [fromToken, fromValue, toToken, toValue, slippage, deadline] = useWatch({
    control,
    name: ['fromToken', 'fromValue', 'toToken', 'toValue', 'slippage', 'deadline'],
  })

  const summary: SummaryField[] = useMemo(() => {
    const exchangeRate = fromToken?.price / toToken?.price

    return [
      {
        label: 'Exchange rate:',
        value: (
          <>
            1 {fromToken?.currency} ={' '}
            {
              <NumberFlow
                className="tracking-wider"
                value={exchangeRate}
                format={{ compactDisplay: 'long', maximumFractionDigits: 16 }}
              />
            }{' '}
            {toToken?.currency}
          </>
        ),
      },
      {
        label: 'Max slippage tolerance:',
        value: `${slippage}%`,
      },
      {
        label: 'Deadline',
        value: deadline ? formatTime(deadline) : '',
      },
      {
        label: 'Network fee:',
        value: <span className="font-semibold text-red-500/80">0.2048 ETH (~$772,74)</span>,
      },
      {
        label: 'Price impact:',
        value: (
          <div className="flex items-center gap-1">
            <span className="text-green-400">0,2048%</span> <IconAlert size={12} />
          </div>
        ),
      },
    ]
  }, [fromToken, toToken, slippage, deadline])

  if (errors.root) {
    return (
      <div
        className={[
          'glass-box-tertiary glass-box-inset-shadow',
          'mt-2 rounded-xl p-2 font-semibold tracking-wide',
          'border-rose-100/80 bg-rose-100/95 text-rose-800/90',
        ].join(' ')}
      >
        {errors.root.message}
      </div>
    )
  }

  function formatTime(timeLeftInMinutes: number) {
    const hours = Math.floor(timeLeftInMinutes / 60)
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}${timeLeftInMinutes % 60 > 0 ? ` ${timeLeftInMinutes % 60} minute${timeLeftInMinutes % 60 > 1 ? 's' : ''}` : ''}`
    }
    return `${timeLeftInMinutes} minute${timeLeftInMinutes !== 1 ? 's' : ''}`
  }

  const isHidden = !fromToken || !fromValue || !toToken || !toValue

  return (
    <div className="relative flex w-full flex-col">
      <div className="grid transition-all" style={{ gridTemplateRows: isHidden ? '0fr' : '1fr' }}>
        <div
          className="flex w-full overflow-hidden"
          style={{
            opacity: isHidden ? 0 : 1,
            visibility: isHidden ? 'hidden' : 'visible',
            transition: 'opacity 750ms var(--ease-quart), visibility 500ms var(--ease-quart) 250ms',
          }}
        >
          <div className="glass-box-tertiary mt-6 grid w-full gap-2 rounded-xl p-2">
            <header className="flex items-center justify-between">
              <span className="text-base font-semibold">Summary</span>
            </header>

            <ul className="grid gap-1">
              {summary.map((field, index) => (
                <li className="flex items-center justify-between" key={index}>
                  <div className="text-sm">{field.label}</div>
                  <div className="text-sm tracking-wider">{field.value}</div>
                </li>
              ))}
            </ul>
            <div data-type="price-impact-bar" />
          </div>
        </div>
      </div>
    </div>
  )
}

type SummaryField = {
  label: React.ReactNode
  value: React.ReactNode
}
