import { FC, HTMLAttributes, ReactNode, ReactText } from 'react'
import './collapse-panel.scss'
export interface CollapsePanelProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'onChange'> {
	itemKey?: ReactText
	title?: ReactNode
	expend?: boolean
	onChange?: (expend: boolean) => void
}
declare const CollapsePanel: FC<CollapsePanelProps>
export default CollapsePanel
