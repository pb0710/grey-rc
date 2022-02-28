import React, { FC, FormEvent } from 'react'
import { Field, useForm } from 'gray-react-form'
import { Button, Space } from '../../packages'

interface CheckboxProps {
	value?: boolean
	onChange?(event: any): void
}
const CheckBox: FC<CheckboxProps> = ({ value, onChange }) => (
	<input
		type="checkbox"
		checked={value}
		onChange={(event: FormEvent<HTMLInputElement>) => {
			onChange?.({
				currentTarget: {
					value: event.currentTarget.checked
				}
			})
		}}
	/>
)

const ExampleIndex: FC = () => {
	const form = useForm({
		initialState: {
			nickname: '匿名',
			address: '',
			is_it_myself: false,
			gender: 'male'
		},
		onFulfilled(state) {
			console.log('fulfilled: ', state)
		},
		onFailed() {
			console.log('failed')
		},
		onStateChange(source) {
			console.log('changed: ', source.label, form.getState())
		}
	})
	return (
		<>
			<h1>Index</h1>
			<form onSubmit={form.onSubmit}>
				<Space direction="vertical">
					<label>
						<span>Nickname: </span>
						<Field form={form} label="nickname">
							<input />
						</Field>
					</label>
					<label>
						<span>Address: </span>
						<Field form={form} label="address">
							<input />
						</Field>
					</label>
					<label>
						<span>Is it myself: </span>
						<Field form={form} label="is_it_myself">
							<CheckBox />
						</Field>
					</label>
					<label>
						<span>Gender: </span>
						<Field form={form} label="gender">
							<select>
								<option value="female">female</option>
								<option value="male">male</option>
							</select>
						</Field>
					</label>
					<Button type="submit">submit</Button>
				</Space>
			</form>
		</>
	)
}

export default ExampleIndex
