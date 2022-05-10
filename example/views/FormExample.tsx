import React, { FC } from 'react'
import { Form, Input } from '../../packages'

const FormExample: FC = () => {
	const form = Form.useForm({
		initialState: {
			username: 'initial value'
		},
		onFulfilled() {},
		onFailed() {}
	})
	return (
		<>
			<h1>Form</h1>
			<Form form={form}>
				<Form.Field label="username">
					<Input />
				</Form.Field>
			</Form>
		</>
	)
}

export default FormExample
