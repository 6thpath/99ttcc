import type { TokenSwapForm } from '@/api'
import { IconExchange } from '@/components/icons'
import { useWatch, type Control, type UseFormSetValue } from 'react-hook-form'

type Props = {
  control: Control<TokenSwapForm>
  isDisabled?: boolean
  setValue: UseFormSetValue<TokenSwapForm>
}

export const FieldSwapButton: React.FC<Props> = ({ control, isDisabled, setValue }) => {
  const [fromToken, fromBalance, toToken, toBalance] = useWatch({
    control,
    name: ['fromToken', 'fromBalance', 'toToken', 'toBalance'],
  })

  const handleSwap = () => {
    setValue('fromToken', toToken)
    setValue('toToken', fromToken)
    setValue('fromBalance', toBalance)
    setValue('toBalance', fromBalance)
    setValue('fromValue', 0)
    setValue('toValue', 0)
  }

  return (
    <div className="relative flex justify-center">
      <button
        className={['flex size-10 items-center justify-center rounded-xl', 'absolute -top-5 z-10', 'group'].join(' ')}
        data-variant="primary"
        type="button"
        disabled={isDisabled}
        onClick={handleSwap}
      >
        <IconExchange className="transition-transform ease-quart group-hover:rotate-90" />
      </button>
    </div>
  )
}
