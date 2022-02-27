import React, { FC, useRef, useState } from 'react'
import Input from '../../packages/modules/input'
import Space from '../../packages/modules/basic/Space'
import { mdiArrowUp, mdiMagnify } from '@mdi/js'
import Icon from '../../packages/modules/basic/Icon'
import Divider from '../../packages/modules/basic/Divider'
import Button from '../../packages/modules/button'

const InputExample: FC = () => {
	const [inputVal, setInputVal] = useState('controlled input')
	const [textareaVal, setTextareaVal] = useState('controlled textarea')
	const inputRef = useRef<HTMLInputElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	return (
		<>
			<h1>Input</h1>
			<Space>
				<Input defaultValue="hi" placeholder="basic" />
				<Input
					placeholder="controlled"
					value={inputVal}
					onChange={value => {
						if (typeof value === 'string') setInputVal(value)
					}}
				/>
			</Space>
			<Divider />
			<Space>
				<Input placeholder="prefix" prefix={<Icon path={mdiMagnify} canHover />} />
				<Input placeholder="suffix" suffix={<Icon path={mdiArrowUp} canHover />} />
			</Space>
			<Divider />
			<Space>
				<Input placeholder="allow clear" allowClear defaultValue="allow clear" />
			</Space>
			<Divider />
			<Input placeholder="block" block />
			<Divider />
			<Space direction="vertical">
				<Input placeholder="round" round />
				<Input
					placeholder="round with prefix and suffix"
					round
					prefix={<Icon path={mdiMagnify} canHover />}
					suffix={<Icon path={mdiArrowUp} canHover />}
				/>
				<Input placeholder="round block" round block />
			</Space>
			<Divider />
			<Space>
				<Input placeholder="enabled" />
				<Input placeholder="disabled" disabled />
			</Space>
			<Divider />
			<Space>
				<Input placeholder="forward ref" ref={inputRef} />
				<Button
					primary
					onClick={() => {
						inputRef.current?.focus()
					}}
				>
					focus
				</Button>
				<Button
					primary
					onClick={() => {
						inputRef.current?.blur()
					}}
				>
					blur
				</Button>
			</Space>
			<Divider />
			<Input.Textarea defaultValue="hi" placeholder="basic textarea" />
			<Divider />
			<Input.Textarea
				placeholder="controlled textarea"
				value={textareaVal}
				onChange={value => {
					if (typeof value === 'string') setTextareaVal(value)
				}}
			/>
			<Divider />
			<Input.Textarea autosize placeholder="autosize textarea" />
			<Divider />
			<Input.Textarea block placeholder="block textarea" />
			<Divider />
			<Space>
				<Input.Textarea disabled placeholder="disabled textarea" />
				<Input.Textarea disabled autosize placeholder="disabled autosize textarea" />
			</Space>
			<Divider />
			<Space>
				<Input.Textarea ref={textareaRef} placeholder="ref textarea" />
				<Button
					primary
					onClick={() => {
						textareaRef.current?.focus()
					}}
				>
					focus
				</Button>
				<Button
					primary
					onClick={() => {
						textareaRef.current?.blur()
					}}
				>
					blur
				</Button>
			</Space>
		</>
	)
}

export default InputExample
