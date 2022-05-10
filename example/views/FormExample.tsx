import React, { FC } from 'react'
import { Checkbox, Divider, Form, Input, Radio, Switch } from '../../packages'

const FormExample: FC = () => {
	const form1 = Form.useForm({
		initialState: {
			username: 'initial username',
			pwd: '',
			gender: 0,
			fruit: [1]
		},
		onFulfilled(values) {
			console.log('submit fulfilled', values)
		},
		onFailed() {
			console.log('submit failed')
		}
	})
	const form2 = Form.useForm({
		initialState: {
			username: 'initial username',
			pwd: '',
			gender: 0,
			fruit: [1]
		},
		onFulfilled(values) {
			console.log('submit fulfilled', values)
		},
		onFailed() {
			console.log('submit failed')
		}
	})
	const form3 = Form.useForm({
		initialState: {
			username: 'initial username',
			pwd: '',
			gender: 0,
			fruit: [1]
		},
		onFulfilled(values) {
			console.log('submit fulfilled', values)
		},
		onFailed() {
			console.log('submit failed')
		}
	})
	const formContentEle = (
		<>
			<Form.Field label="username" labelText="Username">
				<Input block />
			</Form.Field>
			<Form.Field label="pwd" labelText="Password">
				<Input block />
			</Form.Field>
			<Form.Field label="retypePwd" labelText="Retype password">
				<Input block />
			</Form.Field>
			<Form.Field label="gender" labelText="Gender">
				<Radio.Group>
					<Radio label={0}>A</Radio>
					<Radio label={1}>B</Radio>
					<Radio label={2}>C</Radio>
				</Radio.Group>
			</Form.Field>
			<Form.Field label="fruit" labelText="Fruit">
				<Checkbox.Group>
					<Checkbox label={0}>apple</Checkbox>
					<Checkbox label={1}>banana</Checkbox>
					<Checkbox label={2}>pear</Checkbox>
				</Checkbox.Group>
			</Form.Field>
			<Form.Field label="switch" labelText="Switch">
				<Switch />
			</Form.Field>
		</>
	)
	return (
		<>
			<h1>Form</h1>
			<div style={{ width: 640 }}>
				<Form form={form1} layout="horizontal">
					{formContentEle}
				</Form>
			</div>
			<Divider />
			<div style={{ width: 400, margin: '0 auto' }}>
				<Form form={form2} layout="vertical">
					{formContentEle}
				</Form>
			</div>
			<Divider />
			<div style={{ width: 800 }}>
				<Form form={form3} layout="inline">
					{formContentEle}
				</Form>
			</div>
		</>
	)
}

export default FormExample
