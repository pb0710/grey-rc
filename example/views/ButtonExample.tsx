import React, { FC } from 'react'
import { mdiAccountOutline, mdiMagnify, mdiShieldCheckOutline } from '@mdi/js'
import { Button, Divider, Icon, Space, Tooltip } from '../../packages'

const ButtonExample: FC = () => {
	return (
		<>
			<h1>Button</h1>
			<Space>
				<Button>click me</Button>
				<Button primary>primary</Button>
				<Button round>round</Button>
				<Tooltip content="circle button">
					<Button circle>
						<Icon path={mdiAccountOutline}></Icon>
					</Button>
				</Tooltip>
				<Tooltip content="circle primary button">
					<Button circle primary>
						<Icon path={mdiMagnify}></Icon>
					</Button>
				</Tooltip>
			</Space>
			<Divider />
			<Button block>block</Button>
			<Divider />
			<Space>
				<Button loading>loading</Button>
				<Button primary loading>
					loading
				</Button>
				<Button round loading>
					loading
				</Button>
				<Button circle loading>
					<Icon path={mdiAccountOutline}></Icon>
				</Button>
			</Space>
			<Divider />
			<Button block loading>
				loading
			</Button>
			<Divider />
			<Space>
				<Button disabled>disabled</Button>
				<a href="https://www.google.com">
					<Button>link</Button>
				</a>
			</Space>
			<Divider />
			<Space>
				<Button icon={<Icon path={mdiShieldCheckOutline}></Icon>}>icon button</Button>
				<Button icon={<Icon path={mdiShieldCheckOutline}></Icon>} primary>
					icon primary button
				</Button>
				<Button icon={<Icon path={mdiShieldCheckOutline}></Icon>} loading>
					icon loading button
				</Button>
			</Space>
		</>
	)
}

export default ButtonExample
