import { mdiAccountEyeOutline, mdiCameraOutline, mdiMagnify } from '@mdi/js'
import React, { FC, useState } from 'react'
import { Space, Input, Divider, Icon } from '../../src'

const InputExample: FC = () => {
	const [value, setValue] = useState<string>()
	return (
		<>
			<h1>Input</h1>
			<Space>
				<Input
					placeholder="basic usage"
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
				/>
				<Input
					placeholder="defaults value"
					defaultValue="defaults value"
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
				/>
				<Input
					placeholder="placeholder"
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
				/>
			</Space>
			<Divider />
			<Input
				block
				placeholder="block"
				value={value}
				onChange={value => {
					console.log('value: ', value)
					setValue(value)
				}}
			/>
			<Divider />
			<Input
				round
				block
				placeholder="round"
				value={value}
				onChange={value => {
					console.log('value: ', value)
					setValue(value)
				}}
			/>
			<Divider />
			<Space>
				<Input
					defaultValue="can be clear"
					placeholder="can be clear"
					canBeClear
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
					onEnter={() => {
						alert('enter')
					}}
				/>
				<Input
					placeholder="on keyboard enter"
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
					onEnter={() => {
						alert('enter')
					}}
				/>
				<Input
					placeholder="disabled"
					disabled
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
				/>
			</Space>
			<Divider />
			<Space>
				<Input
					placeholder="prefix"
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
					prefix={<Icon path={mdiMagnify} size="16px" color="#333" />}
				/>
				<Input
					placeholder="suffix"
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
					suffix={<Icon path={mdiCameraOutline} size="16px" color="#333" />}
				/>
				<Input
					placeholder="prefix and suffix"
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
					prefix={<Icon path={mdiMagnify} size="16px" color="#333" />}
					suffix={<Icon path={mdiCameraOutline} size="16px" color="#333" />}
				/>
			</Space>
			<Divider />
			<Space>
				<Input.Password
					placeholder="password"
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
				/>
				<Input.Password
					placeholder="can be clear"
					canBeClear
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
				/>
				<Input.Password
					placeholder="toggle icon hidden"
					visibilityToggle={false}
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
				/>
			</Space>
			<Divider />
			<Space>
				<Input.Textarea
					placeholder="textarea"
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
				/>
				<Input.Textarea
					placeholder="on keyboard enter"
					value={value}
					onChange={value => {
						console.log('value: ', value)
						setValue(value)
					}}
					onEnter={() => {
						alert('enter')
					}}
				/>
			</Space>
			<Divider />
			<Input.Textarea
				block
				placeholder="block"
				value={value}
				onChange={value => {
					console.log('value: ', value)
					setValue(value)
				}}
				onEnter={() => {
					alert('enter')
				}}
			/>
			<Divider />
		</>
	)
}

export default InputExample
