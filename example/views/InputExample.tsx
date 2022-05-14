import React, { useRef, useState } from 'react'
import Input from '../../packages/modules/input'
import Space from '../../packages/modules/basic/Space'
import { mdiArrowUp, mdiMagnify } from '@mdi/js'
import Icon from '../../packages/modules/basic/Icon'
import Divider from '../../packages/modules/basic/Divider'
import Button from '../../packages/modules/button'

const InputExample = () => {
	const [inputVal, setInputVal] = useState('controlled input')
	const [textareaVal, setTextareaVal] = useState('controlled textarea')
	const inputRef = useRef<HTMLInputElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	return (
		<>
			<h1>Input</h1>
			<Space>
				<Input defaultValue="hi" placeholder="Basic" />
				<Input
					placeholder="Controlled"
					value={inputVal}
					onChange={value => {
						if (typeof value === 'string') setInputVal(value)
					}}
				/>
			</Space>
			<Divider />
			<Space>
				<Input
					placeholder="Prefix"
					prefix={<Icon style={{ backgroundColor: '#fff' }} path={mdiMagnify} canHover />}
				/>
				<Input
					placeholder="Suffix"
					suffix={<Icon style={{ backgroundColor: '#fff' }} path={mdiArrowUp} canHover />}
				/>
			</Space>
			<Divider />
			<Space>
				<Input placeholder="Allow clear" allowClear defaultValue="allow clear" />
			</Space>
			<Divider />
			<Input placeholder="Block" block />
			<Divider />
			<Space direction="vertical">
				<Input placeholder="Round" round />
				<Input
					placeholder="Round with prefix and suffix"
					round
					prefix={<Icon style={{ backgroundColor: '#fff' }} path={mdiMagnify} canHover round />}
					suffix={<Icon style={{ backgroundColor: '#fff' }} path={mdiArrowUp} canHover round />}
				/>
				<Input placeholder="Round block" round block />
			</Space>
			<Divider />
			<Space>
				<Input placeholder="Enabled" />
				<Input placeholder="Disabled" disabled />
			</Space>
			<Divider />
			<Space>
				<Input placeholder="Forward ref" ref={inputRef} />
				<Button
					primary
					onClick={() => {
						inputRef.current?.focus()
					}}
				>
					Focus
				</Button>
				<Button
					primary
					onClick={() => {
						inputRef.current?.blur()
					}}
				>
					Blur
				</Button>
			</Space>
			<Divider />
			<Input.Textarea defaultValue="hi" placeholder="Basic textarea" />
			<Divider />
			<Input.Textarea
				placeholder="Controlled textarea"
				value={textareaVal}
				onChange={value => {
					if (typeof value === 'string') setTextareaVal(value)
				}}
			/>
			<Divider />
			<Input.Textarea autosize placeholder="Autosize textarea" />
			<Divider />
			<Input.Textarea block placeholder="Block textarea" />
			<Divider />
			<Space>
				<Input.Textarea disabled placeholder="Disabled textarea" />
				<Input.Textarea disabled autosize placeholder="Disabled autosize textarea" />
			</Space>
			<Divider />
			<Space>
				<Input.Textarea ref={textareaRef} placeholder="Ref textarea" />
				<Button
					primary
					onClick={() => {
						textareaRef.current?.focus()
					}}
				>
					Focus
				</Button>
				<Button
					primary
					onClick={() => {
						textareaRef.current?.blur()
					}}
				>
					Blur
				</Button>
			</Space>
		</>
	)
}

export default InputExample
