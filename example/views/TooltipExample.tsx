import { mdiCheck, mdiClose } from '@mdi/js'
import React from 'react'
import { Button, Divider, Icon, Space, Switch, Tooltip } from '../../packages'
import './tooltip-example.scss'

const TooltipExample = () => {
	const ceilStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
	return (
		<>
			<h1>Tooltip</h1>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 160px)',
					gridTemplateRows: 'repeat(5, auto)',
					gap: 12,
					justifyContent: 'center'
				}}
			>
				<Tooltip placement="top-start" content="Top start">
					<Button block style={ceilStyle}>
						Top start
					</Button>
				</Tooltip>
				<Tooltip placement="top" content="Top">
					<Button block style={ceilStyle}>
						Top
					</Button>
				</Tooltip>
				<Tooltip placement="top-end" content="Top end">
					<Button block style={ceilStyle}>
						Top end
					</Button>
				</Tooltip>
				<Tooltip placement="left-start" content="Left start">
					<Button block style={ceilStyle}>
						Left start
					</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right-start" content="Right start">
					<Button block style={ceilStyle}>
						Right start
					</Button>
				</Tooltip>
				<Tooltip placement="left" content="Left">
					<Button block style={ceilStyle}>
						Left
					</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right" content="Right">
					<Button block style={ceilStyle}>
						Right
					</Button>
				</Tooltip>
				<Tooltip placement="left-end" content="Left end">
					<Button block style={ceilStyle}>
						Left end
					</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right-end" content="Right end">
					<Button block style={ceilStyle}>
						Right end
					</Button>
				</Tooltip>
				<Tooltip placement="bottom-start" content="Bottom start">
					<Button block style={ceilStyle}>
						Bottom start
					</Button>
				</Tooltip>
				<Tooltip placement="bottom" content="Bottom">
					<Button block style={ceilStyle}>
						Bottom
					</Button>
				</Tooltip>
				<Tooltip placement="bottom-end" content="Bottom end">
					<Button block style={ceilStyle}>
						Bottom end
					</Button>
				</Tooltip>
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
				<Tooltip content="Disabled" disabled>
					<Button icon={<Icon path={mdiClose} />}>Disabled</Button>
				</Tooltip>
			</Space>
		</>
	)
}

export default TooltipExample
