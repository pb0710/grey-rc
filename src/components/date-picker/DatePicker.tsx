import React, { FC, InputHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
import { cls } from 'gray-utils'
import './classes/date-picker.scss'
import Icon from '@mdi/react'
import { mdiCalendarBlank, mdiChevronDown, mdiChevronUp } from '@mdi/js'
import { Button, Divider } from '../..'
import { Calendar, DateUnit } from './calendar'

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
	value: string
	showToday?: boolean
}

export const DatePicker: FC<DatePickerProps> = props => {
	const { className, showToday = false, value = '', onChange, ...rest } = props

	const inputRef = useRef<HTMLInputElement>(null)
	const [matrix, setMatrix] = useState<DateUnit[][]>([])
	const calendar = useMemo(() => Calendar.create(), [])
	calendar.addRender(() => {
		setMatrix(calendar.matrix)
	})

	useEffect(() => {
		calendar.updateDate(new Date(value))
	}, [calendar, value])

	useEffect(() => {
		console.log('matrix', matrix)
		console.log('calendar', calendar)
	}, [calendar, matrix])

	const onCheckPreMonth = () => {
		calendar.showPreMonth()
	}
	const onCheckNextMonth = () => {
		calendar.showNextMonth()
	}

	const calendarEle = matrix.map((row, index) => {
		return (
			<div className="g-row" key={index}>
				{row.map(({ dateStr, isToday, day, withinMonth }) => {
					const withinThisMonth = withinMonth === 'cur'
					return (
						<div
							className={cls('g-column', {
								'g-today': isToday,
								'g-within-this-month': withinThisMonth,
								'g-selection': withinThisMonth && dateStr === value
							})}
							key={dateStr}
							onClick={() => {
								const fakeEvent = { currentTarget: { value: dateStr } }
								if (withinMonth === 'pre') {
									calendar.showPreMonth()
								} else if (withinMonth === 'next') {
									calendar.showNextMonth()
								}

								onChange?.(fakeEvent as any)
							}}
						>
							{day}
						</div>
					)
				})}
			</div>
		)
	})
	return (
		<div className={cls(className, 'g-date-picker')} {...rest}>
			<input ref={inputRef} className="g-inner-input" type="text" value={value} onChange={onChange} />
			<Icon path={mdiCalendarBlank} size="16px"></Icon>
			<div className="g-date-dropdown">
				<div className="g-date-info">
					<div className="g-month-picker">
						<div>{calendar.curYear}年</div>
						<div>{calendar.curMonth}月</div>
					</div>
					<div className="g-operator">
						<div className="g-pre" onClick={onCheckPreMonth}>
							<Icon path={mdiChevronUp} size="14px"></Icon>
						</div>
						<div className="g-next" onClick={onCheckNextMonth}>
							<Icon path={mdiChevronDown} size="14px"></Icon>
						</div>
					</div>
				</div>
				<div className="g-week-bar">
					<span>一</span>
					<span>二</span>
					<span>三</span>
					<span>四</span>
					<span>五</span>
					<span>六</span>
					<span>日</span>
				</div>
				<div className="g-day-picker">{calendarEle}</div>
				{showToday && (
					<>
						<Divider size="small" />
						<div className="g-today-picker">
							<Button>今天</Button>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
