import { mdiAccount, mdiFileImageRemove } from '@mdi/js'
import React, { FC } from 'react'
import { Avatar, Divider, Icon, Space } from '../../packages'

const AvatarExample: FC = () => {
	const picSrc = 'https://img.acgbox.org/2020/12/20/025e7528d9eee.jpg'
	return (
		<>
			<h1>Avatar</h1>
			<Space size="large">
				<Avatar size="small" src={picSrc} />
				<Avatar size="medium" src={picSrc} />
				<Avatar size="large" src={picSrc} />
			</Space>
			<Divider />
			<Space size="large">
				<Avatar round={false} size="small" src={picSrc} />
				<Avatar round={false} size="medium" src={picSrc} />
				<Avatar round={false} size="large" src={picSrc} />
			</Space>
			<Divider />
			<Avatar round={false} src={picSrc}>
				<Icon path={mdiAccount} size="24px" />
			</Avatar>
			<Divider />
			<Avatar round={false} src={picSrc}>
				text
			</Avatar>
			<Divider />
			<Avatar
				round={false}
				src="http://error.path.jpg"
				fallback={<Icon path={mdiFileImageRemove} size="24px" />}
			/>
			<Divider />
			<Avatar badge="99+" round={false} src={picSrc} />
			<Divider />
			<Avatar.Group size="small">
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
			</Avatar.Group>
			<Divider />
			<Avatar.Group size="medium">
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
			</Avatar.Group>
			<Divider />
			<Avatar.Group size="large">
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
			</Avatar.Group>
			<Divider />
			<Avatar.Group overlapFrom="right" size="small">
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
			</Avatar.Group>
			<Divider />
			<Avatar.Group overlapFrom="right" size="medium">
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
			</Avatar.Group>
			<Divider />
			<Avatar.Group overlapFrom="right" size="large">
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
				<Avatar src={picSrc} />
			</Avatar.Group>
		</>
	)
}

export default AvatarExample
