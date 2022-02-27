import React, { FC, useState } from 'react'
import { Space, Switch } from '../../packages'

const SwitchExample: FC = () => {
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
		</>
	)
}

export default SwitchExample
