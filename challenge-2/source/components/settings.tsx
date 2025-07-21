import React, { useRef } from 'react'
import { Button, Dialog, DialogTrigger, Input, NumberField, Popover } from 'react-aria-components'
import { type Control, useController } from 'react-hook-form'

import type { TokenSwapForm } from '@/api'
import { IconGears } from '@/components/icons'

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

  const handleSlippageSelect: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    onSlippageChange(Number(event.currentTarget.value))
  }

  const slippageOptions = [
    { value: 0.1, label: '0.1%' },
    { value: 0.2, label: '0.2%' },
    { value: 0.5, label: '0.5%' },
    { value: 1, label: '1%' },
    { value: 2, label: '2%' },
  ]

  return (
    <div className="relative">
      <DialogTrigger>
        <Button
          className={[
            'group inline-flex items-center rounded-full p-2 text-white',
            'data-pressed:border-slate-100/20 data-pressed:bg-slate-700',
            'data-pressed:[&>div]:[grid-template-rows:1fr]',
            'data-pressed:[&>div>div]:visible data-pressed:[&>div>div]:opacity-100',
            'data-pressed:[&>div>div]:w-fit',
            'data-focus-visible:border-slate-100/20 data-focus-visible:bg-slate-700',
            'data-focus-visible:[&>div]:[grid-template-rows:1fr]',
            'data-focus-visible:[&>div>div]:visible data-focus-visible:[&>div>div]:opacity-100',
            'data-focus-visible:[&>div>div]:w-fit',
          ].join(' ')}
          data-variant="ghost"
          type="button"
        >
          <div className="grid [grid-template-rows:0fr] transition-all group-hover:[grid-template-rows:1fr]">
            <div
              className={[
                'invisible flex w-0 overflow-hidden opacity-0',
                'group-hover:visible group-hover:w-fit group-hover:opacity-100',
                'origin-right',
              ].join(' ')}
              style={{ transition: 'opacity 750ms var(--ease-quart), visibility 500ms var(--ease-quart) 250ms' }}
            >
              <span className="mr-2 text-sm">Settings</span>
            </div>
          </div>
          <IconGears size={24} />
        </Button>

        <Popover placement="bottom end">
          <Dialog className="outline-0">
            <div
              className={[
                'glass-box-secondary glass-box-inset-shadow',
                'z-30 w-72 rounded-xl p-4 backdrop-blur-md',
                'flex flex-col gap-6',
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
          </Dialog>
        </Popover>
      </DialogTrigger>
    </div>
  )
}
