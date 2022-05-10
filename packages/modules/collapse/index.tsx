import { cls, is } from 'grey-utils'
import React, { Children, cloneElement, FC, HTMLAttributes, isValidElement, useEffect, useState } from 'react'
import { UI_PREFIX } from '../../constants'
import './collapse.scss'
import CollapsePanel, { CollapsePanelProps } from './CollapsePanel'

interface CollapseProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
	accordion?: boolean
	defaultActives?: (string | number)[]
	actives?: (string | number)[]
	onChange?: (actives: (string | number)[]) => void
}

const Collapse: FC<CollapseProps> = props => {
	const { className, children, accordion = false, defaultActives = [], actives, onChange, ...rest } = props
	const [_actives, _setActives] = useState<(string | number)[]>(defaultActives)

	useEffect(() => {
		const isControlled = !is.undefined(actives)
		if (isControlled) _setActives(actives)
	}, [actives])

	const prefixCls = `${UI_PREFIX}-collapse`

	return (
		<div className={cls(className, prefixCls)} {...rest}>
			{Children.map(children, child => {
				if (!isValidElement<CollapsePanelProps>(child)) return child

				const { itemKey } = child.props
				if (is.undefined(itemKey)) return child

				return cloneElement<CollapsePanelProps>(child, {
					expend: _actives.includes(itemKey),
					onChange(expend) {
						let nextActives = _actives
						if (expend) {
							nextActives = accordion ? [itemKey] : [..._actives, itemKey]
						} else {
							nextActives = _actives.filter(active => active !== itemKey)
						}
						_setActives(nextActives)
						onChange?.(nextActives)
					}
				})
			})}
		</div>
	)
}

const ExportCollapse = Collapse as typeof Collapse & {
	Panel: typeof CollapsePanel
}
ExportCollapse.Panel = CollapsePanel

export default ExportCollapse
