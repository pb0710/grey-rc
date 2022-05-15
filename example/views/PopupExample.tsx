import React, { useState } from 'react'
import { Button, Divider, Popup, Space } from '../../packages'

const PopupExample = () => {
	const [visible, setVisible] = useState(false)
	const ceilStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
	return (
		<>
			<h1>Popup</h1>
			<Space>
				<Popup trigger="hover" content="Show by hover">
					<Button>Hover</Button>
				</Popup>
				<Popup trigger="click" content="Show by click">
					<Button>Click</Button>
				</Popup>
				<Popup
					trigger="manual"
					content="Show by manual"
					visible={visible}
					onVisibleChange={val => {
						console.log('val', val)

						setVisible(val)
					}}
				>
					<Button onClick={() => setVisible(pre => !pre)}>Manual</Button>
				</Popup>
			</Space>
			<Divider />
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 160px)',
					gridTemplateRows: 'repeat(5, auto)',
					gap: 12,
					justifyContent: 'center'
				}}
			>
				<Popup trigger="hover" position="top-start" content="Top start">
					<Button block style={ceilStyle}>
						Top start
					</Button>
				</Popup>
				<Popup trigger="hover" position="top" content="Top">
					<Button block style={ceilStyle}>
						Top
					</Button>
				</Popup>
				<Popup trigger="hover" position="top-end" content="Top end">
					<Button block style={ceilStyle}>
						Top end
					</Button>
				</Popup>
				<Popup trigger="hover" position="left-start" content="Left start">
					{' '}
					<Button block style={ceilStyle}>
						Left start
					</Button>
				</Popup>
				<div style={ceilStyle}></div>
				<Popup trigger="hover" position="right-start" content="Right start">
					<Button block style={ceilStyle}>
						Right start
					</Button>
				</Popup>
				<Popup trigger="hover" position="left" content="Left">
					<Button block style={ceilStyle}>
						Left
					</Button>
				</Popup>
				<div style={ceilStyle}></div>
				<Popup trigger="hover" position="right" content="Right">
					<Button block style={ceilStyle}>
						Right
					</Button>
				</Popup>
				<Popup trigger="hover" position="left-end" content="Left end">
					<Button block style={ceilStyle}>
						Left end
					</Button>
				</Popup>
				<div style={ceilStyle}></div>
				<Popup trigger="hover" position="right-end" content="Right end">
					<Button block style={ceilStyle}>
						Right end
					</Button>
				</Popup>
				<Popup trigger="hover" position="bottom-start" content="Bottom start">
					<Button block style={ceilStyle}>
						Bottom start
					</Button>
				</Popup>
				<Popup trigger="hover" position="bottom" content="Bottom">
					<Button block style={ceilStyle}>
						Bottom
					</Button>
				</Popup>
				<Popup trigger="hover" position="bottom-end" content="Bottom end">
					<Button block style={ceilStyle}>
						Bottom end
					</Button>
				</Popup>
			</div>
		</>
	)
}

export default PopupExample
