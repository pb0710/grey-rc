import { mdiPlus, mdiMinus } from '@mdi/js'
import React, { FC, useState } from 'react'
import { Space, Progress, Button, Icon, Divider } from '../../packages'

const ProgressExample: FC = () => {
	const [percent, setPercent] = useState(70)

	const operationEle = (
		<Space>
			<Button
				circle
				disabled={percent <= 0}
				onClick={() => {
					setPercent(pre => pre - 5)
				}}
			>
				<Icon path={mdiMinus} />
			</Button>
			<Button
				circle
				disabled={percent >= 100}
				onClick={() => {
					setPercent(pre => pre + 5)
				}}
			>
				<Icon path={mdiPlus} />
			</Button>
		</Space>
	)

	return (
		<>
			<h1>Progress</h1>
			{operationEle}
			<br />
			<Space direction="vertical" style={{ width: 400 }}>
				<Progress size="small" defaultPercent={70} percent={percent} />
				<Progress size="medium" defaultPercent={70} percent={percent} />
				<Progress size="large" defaultPercent={70} percent={percent} />
				<Progress suffix="/100" defaultPercent={70} percent={percent} />
				<Progress format={null} defaultPercent={70} percent={percent} suffix="/100" />
				<Progress
					format={({ countUpRef }) => (
						<span style={{ color: 'purple' }}>
							<span ref={countUpRef}></span>/100
						</span>
					)}
					defaultPercent={70}
					percent={percent}
					suffix={null}
				/>
			</Space>
			<Divider />
			{operationEle}
			<br />
			<Space size="large" style={{ height: 200 }}>
				<Progress direction="vertical" size="small" defaultPercent={70} percent={percent} />
				<Progress direction="vertical" size="medium" defaultPercent={70} percent={percent} />
				<Progress direction="vertical" size="large" defaultPercent={70} percent={percent} />
			</Space>
			<Divider />
			<Space size="large">
				<Space direction="vertical">
					<Progress.Circle defaultMolecule={70} molecule={percent} />
					{operationEle}
				</Space>
				<Space direction="vertical">
					<Progress.Circle defaultMolecule={70} molecule={percent} round={false} />
					{operationEle}
				</Space>
				<Space direction="vertical">
					<Progress.Circle defaultMolecule={70} molecule={percent} format={null} />
					{operationEle}
				</Space>
				<Space direction="vertical">
					<Progress.Circle defaultMolecule={70} molecule={percent} suffix="/100" />
					{operationEle}
				</Space>
				<Space direction="vertical">
					<Progress.Circle
						defaultMolecule={70 * 5}
						molecule={percent * 5}
						denominator={500}
						suffix="/500"
					/>
					{operationEle}
				</Space>
				<Space direction="vertical">
					<Progress.Circle
						defaultMolecule={70}
						molecule={percent}
						suffix={null}
						format={({ countUpRef }) => (
							<div style={{ color: 'purple', fontSize: 16 }}>
								<span ref={countUpRef}></span>
								<span>/100</span>
							</div>
						)}
					/>
					{operationEle}
				</Space>
			</Space>
			<Divider />
			<Space size="large">
				<Progress.Circle size="small" molecule={percent} />
				<Progress.Circle size="medium" molecule={percent} />
				<Progress.Circle size="large" molecule={percent} />
			</Space>
			<Divider />
			<Space>
				<Progress.Countdown duration={12} />
				<Progress.Countdown size="small" duration={60} />
				<Progress.Countdown size="medium" duration={60} />
				<Progress.Countdown size="large" duration={60} />
				<Progress.Countdown duration={60} suffix="秒" />
				<Progress.Countdown duration={60} format={null} />
				<Progress.Countdown
					duration={60}
					suffix={null}
					format={({ countUpRef }) => (
						<div style={{ fontSize: 18, color: 'purple' }}>
							<span ref={countUpRef}></span>
							<span>s</span>
						</div>
					)}
				/>
			</Space>
		</>
	)
}

export default ProgressExample
