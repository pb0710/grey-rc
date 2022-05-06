import React, { HTMLAttributes, ReactText } from 'react'
import './collapse.scss'
import CollapsePanel from './CollapsePanel'
interface CollapseProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
	accordion?: boolean
	defaultActives?: ReactText[]
	actives?: ReactText[]
	onChange?: (actives: ReactText[]) => void
}
declare const ExportCollapse: React.FC<CollapseProps> & {
	Panel: typeof CollapsePanel
}
export default ExportCollapse
