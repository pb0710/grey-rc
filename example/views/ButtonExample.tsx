import React from 'react'
import { mdiPlus, mdiMagnify, mdiShieldCheckOutline } from '@mdi/js'
import { Button, Divider, Icon, Space, Tooltip } from '../../packages'

const ButtonExample = () => {
	return (
		<>
			<h1>Button</h1>
			<Space>
				<Button>Click me</Button>
				<Button primary>Primary</Button>
				<Button round>Round</Button>
				<Tooltip content="square button">
					<Button square>
						<Icon path={mdiPlus}></Icon>
					</Button>
				</Tooltip>
				<Tooltip content="square primary button">
					<Button square primary>
						<Icon path={mdiMagnify}></Icon>
					</Button>
				</Tooltip>
				<Tooltip content="circle button">
					<Button circle>
						<Icon path={mdiPlus}></Icon>
					</Button>
				</Tooltip>
				<Tooltip content="circle primary button">
					<Button circle primary>
						<Icon path={mdiMagnify}></Icon>
					</Button>
				</Tooltip>
			</Space>
			<Divider />
			<Button block>Block</Button>
			<Divider />
			<Space>
				<Button loading>Loading</Button>
				<Button primary loading>
					Loading
				</Button>
				<Button round loading>
					Loading
				</Button>
				<Button circle loading>
					<Icon path={mdiPlus}></Icon>
				</Button>
			</Space>
			<Divider />
			<Button block loading>
				Loading
			</Button>
			<Divider />
			<Space>
				<Button disabled>Disabled</Button>
				<a href="https://www.google.com">
					<Button>Link</Button>
				</a>
			</Space>
			<Divider />
			<Space>
				<Button icon={<Icon path={mdiShieldCheckOutline}></Icon>}>Icon button</Button>
				<Button icon={<Icon path={mdiShieldCheckOutline}></Icon>} primary>
					Icon primary button
				</Button>
				<Button icon={<Icon path={mdiShieldCheckOutline}></Icon>} loading>
					Icon loading button
				</Button>
			</Space>
		</>
	)
}

export default ButtonExample
