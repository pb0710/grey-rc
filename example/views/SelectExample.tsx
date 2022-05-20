import React, { useState } from 'react'
import { Divider, Select } from '../../packages'

const SelectExample = () => {
	const [gender, setGender] = useState<'male' | 'female'>('male')
	const [sys, setSys] = useState<string>('macos')
	return (
		<>
			<h1>Select</h1>
			<Select value={gender} onChange={value => setGender(value as any)}>
				<Select.Option value="male">Male</Select.Option>
				<Select.Option value="female">Female</Select.Option>
			</Select>
			<Divider />
			<Select block value={gender} onChange={value => setGender(value as any)}>
				<Select.Option value="male">Male</Select.Option>
				<Select.Option value="female">Female</Select.Option>
			</Select>
			<Divider />
			<Select multiple value={sys} onChange={value => setSys(value as any)}>
				<Select.Option value="windows">Windows</Select.Option>
				<Select.Option value="macos">MacOS</Select.Option>
				<Select.Option value="android">Android</Select.Option>
				<Select.Option value="linux">Linux</Select.Option>
				<Select.Option value="ios">IOS</Select.Option>
			</Select>
		</>
	)
}

export default SelectExample
