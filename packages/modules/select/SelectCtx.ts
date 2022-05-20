import { createContext, ReactNode } from 'react'

export interface OptionItem {
	value: string | number
	label: ReactNode
}
export interface SelectContext {
	selection: (string | number)[]
	updateSelection: (value: string | number) => void
	subscribe: (option: OptionItem) => () => void
}
export const SelectCtx = createContext<Partial<SelectContext>>({})
