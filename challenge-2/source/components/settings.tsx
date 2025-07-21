import React, { useRef } from 'react'

import { IconGears } from '@/components/icons'
import type { TokenSwapForm } from '@/api'
import { useController, type Control } from 'react-hook-form'
import { Input, NumberField } from 'react-aria-components'

type Props = {
  control: Control<TokenSwapForm>
}

export const Settings: React.FC<Props> = ({ control }) => {
  const {
    field: { value: deadline, onChange: onDeadlineChange },
    formState: { isSubmitting },
  } = useController({ control, name: 'deadline' })
  const {
    field: { value: slippage, onChange: onSlippageChange },
  } = useController({ control, name: 'slippage' })
  const popupElementRef = useRef<HTMLDivElement | null>(null)

  const handleOpenPopup = () => {
    popupElementRef.current?.classList.toggle('hidden')
  }

  const handleSlippageSelect: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    onSlippageChange(Number(event.currentTarget.value))
  }

  const slippageOptions = [
    { value: 0.1, label: '0.1%' },
    { value: 0.2, label: '0.2%' },
    { value: 0.5, label: '0.5%' },
    { value: 100, label: 'Custom' },
  ]

  return (
    <div className="relative">
      <button
        className="group inline-flex items-center gap-2 rounded-full p-2 text-white"
        data-variant="ghost"
        type="button"
        tabIndex={0}
        onClick={handleOpenPopup}
      >
        <div className="grid [grid-template-rows:0fr] transition-all group-hover:[grid-template-rows:1fr]">
          <div
            className={[
              'invisible flex overflow-hidden opacity-0',
              'group-hover:visible group-hover:w-auto group-hover:opacity-100',
              'origin-right',
            ].join(' ')}
            style={{
              transition: 'opacity 750ms var(--ease-quart), visibility 500ms var(--ease-quart) 250ms',
            }}
          >
            <span>Settings</span>
          </div>
        </div>
        <IconGears size={24} />
      </button>

      <div
        className={[
          'glass-box-secondary glass-box-inset-shadow',
          'absolute right-0 z-30 rounded-xl p-4 backdrop-blur-md',
          'mt-2 flex flex-col gap-6',
          'hidden',
        ].join(' ')}
        ref={popupElementRef}
      >
        <div>
          <h3 className="mb-2 font-medium">Slippage tolerance</h3>
          <div className="flex gap-1 rounded-sm bg-slate-700/70 px-2 py-1">
            {slippageOptions.map((option, index) => (
              <button
                className="rounded px-2 data-active:bg-slate-900/50"
                data-variant="ghost"
                type="button"
                key={index}
                value={option.value}
                disabled={isSubmitting}
                data-active={slippage === option.value || undefined}
                onClick={handleSlippageSelect}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-medium">Transaction deadline</h3>
          <div className="flex items-center">
            <NumberField
              className="w-20"
              minValue={0}
              maxValue={120}
              formatOptions={{ useGrouping: false, maximumFractionDigits: 0 }}
              value={deadline}
              isDisabled={isSubmitting}
              onChange={onDeadlineChange}
            >
              <Input
                className="w-full pr-2 text-xl font-medium tracking-wider text-white"
                placeholder="0"
                data-variant="primary"
              />
            </NumberField>

            <span className="ml-2 text-sm">minutes</span>
          </div>
        </div>
      </div>
    </div>
  )
}
