import React, { FC, useEffect, useRef, useState } from 'react'
import { Checkbox, Divider, Space } from '../../packages'

const CheckboxExample: FC = () => {
	const [val, setVal] = useState(false)
	const defaultGroupVal = [2]
	const [groupVal, setGroupVal] = useState<(string | number)[]>(defaultGroupVal)
	const checkboxRef = useRef<HTMLInputElement>(null)
	const defaultHorizontalVal = [0, 1]
	const [horizontalVal, setHorizontalVal] = useState<(string | number)[]>(defaultHorizontalVal)
	const defaultVerticalVal = [1]
	const [verticalVal, setVerticalVal] = useState<(string | number)[]>(defaultVerticalVal)
	const defaultJsxGroupVal = [2, 3]
	const [jsxGroupVal, setJsxGroupVal] = useState<(string | number)[]>(defaultJsxGroupVal)
	useEffect(() => {
		setTimeout(() => {
			console.log('checkboxRef.current.checked', checkboxRef.current?.checked)
		}, 1000)
	}, [])
	return (
		<>
			<h1>Checkbox</h1>
			<Space>
				<Checkbox defaultValue={true}>basic</Checkbox>
				<Checkbox
					value={val}
					onChange={value => {
						if (typeof value === 'boolean') {
							setVal(value)
						}
					}}
				>
					controlled
				</Checkbox>
			</Space>
			<Divider />
			<Checkbox.Group
				defaultValue={defaultGroupVal}
				options={[
					{
						label: 0,
						child: 'cherry'
					},
					{
						label: 1,
						child: 'apple'
					},
					{
						label: 2,
						child: 'pear'
					},
					{
						label: 3,
						child: 'orange',
						disabled: true
					}
				]}
				value={groupVal}
				onChange={value => {
					setGroupVal(value)
				}}
			/>
			<Divider />
			<Space direction="vertical">
				<Checkbox.Group
					direction="horizontal"
					defaultValue={defaultHorizontalVal}
					options={[
						{ label: 0, child: 'horizontal a' },
						{ label: 1, child: 'horizontal b' },
						{ label: 2, child: 'horizontal c' }
					]}
					value={horizontalVal}
					onChange={value => {
						setHorizontalVal(value)
					}}
				/>
				<Checkbox.Group
					direction="vertical"
					defaultValue={defaultVerticalVal}
					options={[
						{ label: 0, child: 'vertical a' },
						{ label: 1, child: 'vertical b' },
						{ label: 2, child: 'vertical c' }
					]}
					value={verticalVal}
					onChange={value => {
						setVerticalVal(value)
					}}
				/>
			</Space>
			<Divider />
			<Checkbox ref={checkboxRef} defaultValue={true}>
				forward ref
			</Checkbox>
			<Divider />
			<Space direction="vertical">
				<Checkbox disabled>disabled</Checkbox>
				<Checkbox.Group
					disabled
					options={[
						{ label: 0, child: 'a' },
						{ label: 1, child: 'b' },
						{ label: 2, child: 'c' }
					]}
				/>
			</Space>
			<Divider />
			<Checkbox.Group
				direction="vertical"
				defaultValue={defaultJsxGroupVal}
				options={[
					{ label: 0, child: 'options a' },
					{ label: 1, child: 'options b' },
					{ label: 2, child: 'options c' }
				]}
				value={jsxGroupVal}
				onChange={value => {
					setJsxGroupVal(value)
				}}
			>
				<Checkbox label={3}>jsx a</Checkbox>
				<Checkbox label={4}>jsx b</Checkbox>
				<Checkbox label={5}>jsx c</Checkbox>
			</Checkbox.Group>
		</>
	)
}

export default CheckboxExample
