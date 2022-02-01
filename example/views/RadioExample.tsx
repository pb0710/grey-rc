import React, { FC, useState } from 'react'
import { Divider, Radio, Space } from '../../src'

const RadioExample: FC = () => {
	const [checked, setChecked] = useState<Record<string, boolean | undefined>>({
		a: false,
		b: undefined,
		c: false,
		d: false,
		e: true
	})

	const [groupValue, setGroupValue] = useState()

	return (
		<>
			<h1>Radio</h1>
			<Space>
				<Radio
					value={checked.a}
					onChange={checked => {
						console.log('checked: ', checked)
						setChecked(pre => ({ ...pre, a: checked }))
					}}
				>
					Apple
				</Radio>
				<Radio
					defaultValue={true}
					value={checked.b}
					onChange={checked => {
						console.log('checked: ', checked)
						setChecked(pre => ({ ...pre, b: checked }))
					}}
				>
					Pear
				</Radio>
				<Radio
					value={checked.c}
					onChange={checked => {
						console.log('checked: ', checked)
						setChecked(pre => ({ ...pre, c: checked }))
					}}
				>
					Orange
				</Radio>
				<Radio
					disabled
					value={checked.d}
					onChange={checked => {
						console.log('checked: ', checked)
						setChecked(pre => ({ ...pre, d: checked }))
					}}
				>
					Disabled
				</Radio>
				<Radio
					disabled
					value={checked.e}
					onChange={checked => {
						console.log('checked: ', checked)
						setChecked(pre => ({ ...pre, e: checked }))
					}}
				>
					Disabled
				</Radio>
			</Space>
			<Divider />
			<Radio.Group
				direction="vertical"
				value={groupValue}
				onChange={value => {
					console.log('value: ', value)
					setGroupValue(value)
				}}
			>
				<div>
					<Radio option="a">水电费水电费Angular</Radio>
				</div>
				<Radio option="v">Vue</Radio>
				<Radio option="r">React</Radio>
			</Radio.Group>
		</>
	)
}

export default RadioExample
