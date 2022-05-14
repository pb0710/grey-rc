import { mdiCheck, mdiClose } from '@mdi/js'
import React from 'react'
import { Button, Divider, Icon, Space, Switch, Tooltip } from '../../packages'
import './tooltip-example.scss'

const TooltipExample = () => {
	return (
		<>
			<h1>Tooltip</h1>
			<div className="tooltip-box">
				<div className="ceil empty"></div>
				<Tooltip className="ceil" direction="top" content="Top">
					Top
				</Tooltip>
				<div className="ceil empty"></div>
				<Tooltip className="ceil" direction="left" content="Left">
					Left
				</Tooltip>
				<div className="ceil empty"></div>
				<Tooltip className="ceil" direction="right" content="Right">
					Right
				</Tooltip>
				<div className="ceil empty"></div>
				<Tooltip className="ceil" direction="bottom" content="Bottom">
					Bottom
				</Tooltip>
				<div className="ceil empty"></div>
			</div>
			<Divider />
			<Space size="large">
				<Tooltip content="Icon tooltip">
					<Button circle>
						<Icon path={mdiCheck} />
					</Button>
				</Tooltip>
				<Tooltip content="Button tooltip">
					<Button primary>Primary button</Button>
				</Tooltip>
				<Tooltip content="Switch tooltip">
					<Switch />
				</Tooltip>
				<Tooltip content="Tooltip">
					<span>Text or anything</span>
				</Tooltip>
			</Space>
			<Divider />
			<Space>
				<Tooltip content="Enabled">
					<Button icon={<Icon path={mdiCheck} />}>Enabled</Button>
				</Tooltip>
				<Tooltip disabled content="Disabled">
					<Button icon={<Icon path={mdiClose} />}>Disabled</Button>
				</Tooltip>
			</Space>
		</>
	)
}

export default TooltipExample
