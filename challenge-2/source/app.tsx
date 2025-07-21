import { zodResolver } from '@hookform/resolvers/zod'
import type React from 'react'
import { useForm } from 'react-hook-form'

import { Settings } from '@/components/settings'
import { TokenField } from '@/components/token-field'
import { FieldSwapButton } from '@/components/swap-field-button'
import { tokenSwapFormSchema, type TokenSwapFormData } from '@/api'
import { Summary } from '@/components/summary'
import { IconLoader } from '@/components/icons'

export const Application: React.FC = () => {
  const {
    formState: { isValid, isSubmitting },
    control,
    getValues,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(tokenSwapFormSchema),
    defaultValues: {
      fromBalance: 0,
      toBalance: 0,
      slippage: 0.2,
      deadline: 30,
    },
  })

  const onSubmitHandler = async (data: TokenSwapFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    window.alert('Swap successful!')
    setValue('fromValue', 0)
    setValue('toValue', 0)
  }

  return (
    <main className="container mx-auto flex items-center justify-center select-none">
      <form
        className={['glass-box-primary', 'relative flex flex-col gap-4 overflow-hidden', 'w-[420px] rounded-3xl p-4'].join(' ')}
        onSubmit={handleSubmit(onSubmitHandler, console.debug)}
      >
        <header className="flex items-center justify-between">
          <span className="px-2 text-3xl font-semibold">Swap</span>
          <Settings control={control} />
        </header>

        <section className="relative mt-6 flex flex-col gap-1">
          <TokenField
            id="ts-from"
            labelText="From"
            context="from"
            control={control}
            getValues={getValues}
            setValue={setValue}
          />
          <FieldSwapButton control={control} isDisabled={isSubmitting} setValue={setValue} />
          <TokenField id="ts-to" labelText="To" context="to" control={control} getValues={getValues} setValue={setValue} />
          <Summary control={control} />
        </section>

        <footer>
          <button
            className={[
              'inline-flex w-full items-center justify-center',
              'rounded-xl p-4',
              'font-medium',
              'hover:-translate-y-1',
            ].join(' ')}
            data-variant="accent"
            type="submit"
            tabIndex={0}
            disabled={!isValid}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <IconLoader size={32} />
              </span>
            ) : (
              'Connect Wallet'
            )}
          </button>
        </footer>
      </form>
    </main>
  )
}
