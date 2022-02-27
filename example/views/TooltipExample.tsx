import { mdiCheck, mdiClose } from '@mdi/js'
import React, { FC } from 'react'
import { Button, Divider, Icon, Space, Switch, Tooltip } from '../../packages'
import './tooltip-example.scss'

const TooltipExample: FC = () => {
	return (
		<>
			<h1>Tooltip</h1>
			<div className="tooltip-box">
				<div className="ceil empty"></div>
				<Tooltip className="ceil" direction="top" content="top">
					top
				</Tooltip>
				<div className="ceil empty"></div>
				<Tooltip className="ceil" direction="left" content="left">
					left
				</Tooltip>
				<div className="ceil empty"></div>
				<Tooltip className="ceil" direction="right" content="right">
					right
				</Tooltip>
				<div className="ceil empty"></div>
				<Tooltip className="ceil" direction="bottom" content="bottom">
					bottom
				</Tooltip>
				<div className="ceil empty"></div>
			</div>
			<Divider />
			<Space size="large">
				<Tooltip content="icon tooltip">
					<Button circle>
						<Icon path={mdiCheck} />
					</Button>
				</Tooltip>
				<Tooltip content="button tooltip">
					<Button primary>primary button</Button>
				</Tooltip>
				<Tooltip content="switch tooltip">
					<Switch />
				</Tooltip>
				<Tooltip content="tooltip">
					<span>text or anything</span>
				</Tooltip>
			</Space>
			<Divider />
			<Space>
				<Tooltip content="enabled">
					<Button icon={<Icon path={mdiCheck} />}>enabled</Button>
				</Tooltip>
				<Tooltip disabled content="disabled">
					<Button icon={<Icon path={mdiClose} />}>disabled</Button>
				</Tooltip>
			</Space>
		</>
	)
}

export default TooltipExample
