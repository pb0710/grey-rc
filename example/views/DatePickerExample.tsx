import React, { FC, useState } from 'react'
import { DatePicker, Space } from '../../src'

const DatePickerExample: FC = () => {
	const [date, setDate] = useState('2021-12-18')
	return (
		<>
			<h1>Date Picker</h1>
			<Space>
				<DatePicker
					value={date}
					onChange={e => {
						console.log(e.currentTarget.value)
						setDate(e.currentTarget.value)
					}}
				/>
			</Space>
		</>
	)
}

export default DatePickerExample
