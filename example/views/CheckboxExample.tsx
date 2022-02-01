import React, { FC, useState } from 'react'
import { Divider, Checkbox, Space } from '../../src'

const CheckboxExample: FC = () => {
	const [checked, setChecked] = useState<Record<string, boolean | undefined>>({
		a: false,
		b: undefined,
		c: false,
		d: false,
		e: true
	})

	const [groupValue, setGroupValue] = useState<string[]>([])

	return (
		<>
			<h1>Radio</h1>
			<Space>
				<Checkbox
					value={checked.a}
					onChange={checked => {
						console.log('checked: ', checked)
						setChecked(pre => ({ ...pre, a: checked }))
					}}
				>
					Apple
				</Checkbox>
				<Checkbox
					defaultValue={true}
					value={checked.b}
					onChange={checked => {
						console.log('checked: ', checked)
						setChecked(pre => ({ ...pre, b: checked }))
					}}
				>
					Pear
				</Checkbox>
				<Checkbox
					value={checked.c}
					onChange={checked => {
						console.log('checked: ', checked)
						setChecked(pre => ({ ...pre, c: checked }))
					}}
				>
					Orange
				</Checkbox>
				<Checkbox
					disabled
					value={checked.d}
					onChange={checked => {
						console.log('checked: ', checked)
						setChecked(pre => ({ ...pre, d: checked }))
					}}
				>
					Disabled
				</Checkbox>
				<Checkbox
					disabled
					value={checked.e}
					onChange={checked => {
						console.log('checked: ', checked)
						setChecked(pre => ({ ...pre, e: checked }))
					}}
				>
					Disabled
				</Checkbox>
			</Space>
			<Divider />
			<Checkbox.Group
				direction="vertical"
				defaultValue={['a']}
				value={groupValue}
				onChange={value => {
					console.log('value: ', value)
					setGroupValue(value)
				}}
			>
				<div>
					<Checkbox option="a">水电费水电费Angular</Checkbox>
				</div>
				<Checkbox option="v">Vue</Checkbox>
				<Checkbox option="r">React</Checkbox>
			</Checkbox.Group>
		</>
	)
}

export default CheckboxExample
