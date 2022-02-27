import React, { FC, ReactText, useEffect, useRef, useState } from 'react'
import { Divider, Radio, Space } from '../../packages'

const RadioExample: FC = () => {
	const [val, setVal] = useState(false)
	const defaultGroupVal = 2
	const [groupVal, setGroupVal] = useState<ReactText>(defaultGroupVal)
	const radioRef = useRef<HTMLInputElement>(null)
	const defaultHorizontalVal = 1
	const [horizontalVal, setHorizontalVal] = useState<ReactText>(defaultHorizontalVal)
	const defaultVerticalVal = 0
	const [verticalVal, setVerticalVal] = useState<ReactText>(defaultVerticalVal)
	const defaultDisabledVal = 2
	const [disabledGroupVal, setDisabledGroupVal] = useState<ReactText>(defaultDisabledVal)
	const defaultJsxGroupVal = 2
	const [jsxGroupVal, setJsxGroupVal] = useState<ReactText>(defaultJsxGroupVal)
	const defaultJsxTabGroupVal = 1
	const [jsxTabGroupVal, setJsxTabGroupVal] = useState<ReactText>(defaultJsxTabGroupVal)
	const defaultOptionsTabGroupVal = 0
	const [optionsTabGroupVal, setOptionsTabGroupVal] = useState<ReactText>(defaultOptionsTabGroupVal)
	useEffect(() => {
		setTimeout(() => {
			console.log('radioRef.current.checked', radioRef.current?.checked)
		}, 1000)
	}, [])
	return (
		<>
			<h1>Radio</h1>
			<Space>
				<Radio defaultValue={true}>basic</Radio>
				<Radio
					value={val}
					onChange={value => {
						if (typeof value === 'boolean') {
							setVal(value)
						}
					}}
				>
					controlled
				</Radio>
			</Space>
			<Divider />
			<Radio.Group
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
				<Radio.Group
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
				<Radio.Group
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
			<Radio ref={radioRef} defaultValue={true}>
				forward ref
			</Radio>
			<Divider />
			<Space direction="vertical">
				<Radio disabled defaultValue={true}>
					disabled
				</Radio>
				<Radio.Group
					disabled
					options={[
						{ label: 0, child: 'a' },
						{ label: 1, child: 'b' },
						{ label: 2, child: 'c' }
					]}
					defaultValue={defaultDisabledVal}
					value={disabledGroupVal}
					onChange={value => {
						setDisabledGroupVal(value)
					}}
				/>
			</Space>
			<Divider />
			<Radio.Group
				direction="horizontal"
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
				<Radio label={3}>jsx a</Radio>
				<Radio label={4}>jsx b</Radio>
				<Radio label={5}>jsx c</Radio>
			</Radio.Group>
			<Divider />
			<Radio.Group
				type="tab"
				defaultValue={defaultJsxTabGroupVal}
				value={jsxTabGroupVal}
				onChange={value => {
					setJsxTabGroupVal(value)
				}}
			>
				<Radio label={0}>jsx tab a</Radio>
				<Radio label={1}>jsx tab b</Radio>
				<Radio label={2}>jsx tab c</Radio>
			</Radio.Group>
			<Divider />
			<Radio.Group
				type="tab"
				options={[
					{ label: 0, child: 'options tab a' },
					{ label: 1, child: 'options tab b' },
					{ label: 2, child: 'options tab c' }
				]}
				defaultValue={defaultOptionsTabGroupVal}
				value={optionsTabGroupVal}
				onChange={value => {
					setOptionsTabGroupVal(value)
				}}
			/>
			<Divider />
			<Radio.Group type="tab" disabled defaultValue={1}>
				<Radio label={0}>disabled tab a</Radio>
				<Radio label={1}>disabled tab b</Radio>
				<Radio label={2}>disabled tab c</Radio>
			</Radio.Group>
		</>
	)
}

export default RadioExample
