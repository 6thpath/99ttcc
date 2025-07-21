import { Button, Dialog, DialogTrigger, GridList, GridListItem, Heading, Modal, type Selection } from 'react-aria-components'

import { IconCross } from '@/components/icons'
import { useExchangeRate } from '@/hooks/use-exchange-rate'
import type { Token } from '@/api'
import Fuse, { type IFuseOptions } from 'fuse.js'
import { useEffect, useState } from 'react'

const fuseOptions: IFuseOptions<Token> = {
  threshold: 0.2,
  isCaseSensitive: false,
  keys: ['currency'],
}

type Props = {
  excludeTokens?: Token[]
  value?: Token
  isDisabled?: boolean
  onSelect?: (token: Token) => void
}

export const TokenSelect: React.FC<Props> = ({ excludeTokens = [], value, isDisabled, onSelect }) => {
  const { data, isLoading, isError } = useExchangeRate()
  const [fuseInstance, setFuseInstance] = useState<Fuse<Token>>(new Fuse(data, fuseOptions))
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Token[] | null>()

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget.value === '') {
      setSearchResult(null)
    } else {
      const result = fuseInstance.search(event.currentTarget.value)

      setSearchResult(result.map((item) => item.item))
    }

    setSearchInput(event.currentTarget.value)
  }

  const onSelectionChange = (close: VoidFunction) => (keys: Selection) => {
    if (keys === 'all') {
      return
    }

    const firstKey = keys.values().next().value
    const token = data.find((t) => t.address === firstKey)
    if (!token) {
      return
    }

    onSelect?.(token)
    close()
  }

  const onImageLoadError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    event.currentTarget.src = '/token-placeholder.svg'
  }

  useEffect(() => {
    if (data.length) {
      setFuseInstance(new Fuse(data, fuseOptions))
    }
  }, [data])

  const displayTokens = searchResult ?? data ?? []

  return (
    <DialogTrigger>
      <Button
        className={['h-full min-w-fit rounded-md p-2'].join(' ')}
        data-variant="primary"
        isDisabled={isLoading || isDisabled}
      >
        {value ? (
          <div className="flex gap-1">
            <img
              className="size-6"
              key={value.currency}
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/c884d9c223e70c70efae3ece3dc9eaffba28ca56/tokens/${value.currency}.svg`}
              alt={`Token ${value.currency}`}
              loading="lazy"
              onError={onImageLoadError}
            />
            <span className="font-medium">{value.currency}</span>
          </div>
        ) : (
          <span className="font-medium">Select</span>
        )}
      </Button>

      <Modal isDismissable>
        <Dialog className="flex flex-col gap-3">
          {({ close }) => (
            <>
              <header className="flex justify-between">
                <Heading className="text-xl font-semibold">Select Token</Heading>

                <button className="rounded-md" data-variant="ghost" onClick={close}>
                  <IconCross />
                </button>
              </header>

              <input
                data-variant="primary"
                placeholder="Search for token..."
                autoFocus
                value={searchInput}
                onChange={handleSearchInputChange}
              />

              <section>
                {isLoading && (
                  <div className="relative h-4 w-full max-w-md overflow-hidden rounded-full border border-white/30 bg-white/10 shadow-xl backdrop-blur-md">
                    <div className="h-full bg-white/40 transition-all duration-500"></div>
                  </div>
                )}

                {isError && <div>Error</div>}

                {!isLoading && !isError && (
                  <GridList
                    className={[
                      'max-h-[500px] min-h-[500px] overflow-y-auto',
                      'flex flex-col gap-2 p-1',
                      'scrollbar-hidden scrollbar-stable',
                    ].join(' ')}
                    items={displayTokens}
                    disabledKeys={excludeTokens.map((token) => token?.address)}
                    selectionMode="single"
                    selectedKeys={value ? [value.address] : undefined}
                    onSelectionChange={onSelectionChange(close)}
                    disallowEmptySelection
                  >
                    {(item) => (
                      <GridListItem
                        className={[
                          'outline outline-offset-2 outline-transparent focus-visible:outline-sky-600/95',
                          'glass-box-inset-shadow hover:glass-box-tertiary',
                          'cursor-pointer',
                          'flex items-center gap-4 rounded-md p-2',
                          'border border-transparent',
                          'data-selected:bg-slate-500/40',
                          'transition-all',
                          'data-disabled:cursor-pointer data-disabled:opacity-20',
                        ].join(' ')}
                        id={item.address}
                        textValue={item.currency}
                      >
                        {() => (
                          <>
                            <img
                              className="size-6"
                              key={item.currency}
                              src={`https://raw.githubusercontent.com/Switcheo/token-icons/c884d9c223e70c70efae3ece3dc9eaffba28ca56/tokens/${item.currency}.svg`}
                              alt={`Token ${item.currency}`}
                              loading="lazy"
                              onError={onImageLoadError}
                            />

                            <p>{item.currency}</p>

                            <p className="ml-auto">{item.price.toFixed(6)}</p>
                          </>
                        )}
                      </GridListItem>
                    )}
                  </GridList>
                )}
              </section>
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}
