import { zodResolver } from '@hookform/resolvers/zod'
import type React from 'react'
import { useForm } from 'react-hook-form'

import { type TokenSwapFormData, tokenSwapFormSchema } from '@/api'
import { IconLoader } from '@/components/icons'
import { Settings } from '@/components/settings'
import { Summary } from '@/components/summary'
import { FieldSwapButton } from '@/components/swap-field-button'
import { TokenField } from '@/components/token-field'

export const Application: React.FC = () => {
  const {
    formState: { isSubmitting },
    control,
    getValues,
    setValue,
    setError,
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
    console.debug('submitted data', data)
    const isSucceeded = Math.random() > 0.5
    if (isSucceeded) {
      window.alert('Swap successful!')
      setValue('fromValue', 0)
      setValue('toValue', 0)
    } else {
      setError('root', {
        message: Math.random() > 0.5 ? 'Network error. Please try again.' : 'Swap failed due to insufficient liquidity.',
      })
    }
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
              'text-lg font-semibold tracking-widest',
              'hover:-translate-y-1',
            ].join(' ')}
            data-variant="accent"
            type="submit"
            tabIndex={0}
            disabled={isSubmitting}
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
