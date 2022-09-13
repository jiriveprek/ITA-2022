import { useEffect } from 'react'

export const generateId = () => Math.floor(Math.random() * 1_000_000) + 1

export const shuffleArray = <T>(arr: T[]) => {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export const hold = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined)
    }, ms)
  })
}

export const roundTwoDecimals = (number: number) => {
  return Math.round(number * 100) / 100
}

let crownsCZK = Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
})

export const czkFormatting = (number: number) => {
  return crownsCZK.format(roundTwoDecimals(number))
}

export const useComponentDidMount = (fn: () => void) => {
  useEffect(() => {
    fn()
  }, [])
}
