import React, { useState } from 'react'
import { Divider, Space, Switch } from '../../packages'

const SwitchExample = () => {
	const [checked, setChecked] = useState<boolean>(false)
	return (
		<>
			<h1>Switch</h1>
			<Space>
				<Switch defaultValue={true} />
				<Switch
					value={checked}
					onChange={checked => {
						if (typeof checked === 'boolean') setChecked(checked)
					}}
				/>
				<Switch disabled defaultValue={true} />
				<Switch disabled />
			</Space>
			<Divider />
			<Space>
				<Switch size="small" />
				<Switch size="medium" />
				<Switch size="large" />
			</Space>
		</>
	)
}

export default SwitchExample
