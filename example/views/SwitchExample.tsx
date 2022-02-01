import React, { FC, useState } from 'react'
import { Switch, Space } from '../../src'

const SwitchExample: FC = () => {
	const [checked, setChecked] = useState<boolean>()
	return (
		<>
			<h1>Switch</h1>
			<Space>
				<Switch
					// disabled
					defaultValue={true}
					value={checked}
					onChange={checked => {
						console.log(checked)
						setChecked(checked)
					}}
				/>
				<Switch
					// disabled
					defaultValue={true}
					disabled
					value={checked}
					onChange={checked => {
						console.log(checked)
						setChecked(checked)
					}}
				/>
			</Space>
		</>
	)
}

export default SwitchExample
