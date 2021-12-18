import React, { FC } from 'react'
import { Button, Divider, Space } from '../../src'
import Icon from '@mdi/react'
import { mdiAccountOutline, mdiPlayOutline } from '@mdi/js'

const ButtonExample: FC = () => {
	return (
		<>
			<h1>Button</h1>
			<Space>
				<Button>按钮</Button>
				<Button primary>主要</Button>
				<Button round>圆角</Button>
				<Button circle>
					<Icon path={mdiAccountOutline} size="16px"></Icon>
				</Button>
			</Space>
			<Divider />
			<Button block>Block</Button>
			<Divider />
			<Space>
				<Button loading>加载中</Button>
				<Button primary loading>
					加载中
				</Button>
				<Button round loading>
					加载中
				</Button>
				<Button circle loading>
					<Icon path={mdiAccountOutline} size="16px"></Icon>
				</Button>
			</Space>
			<Divider />
			<Button block loading>
				加载中
			</Button>
			<Divider />
			<Space>
				<Button disable>禁用</Button>
				<a href="https://www.google.com">
					<Button>超链接</Button>
				</a>
			</Space>
			<Divider />
			<Space>
				<Button icon={<Icon path={mdiPlayOutline} size="16px"></Icon>}>图标按钮</Button>
				<Button icon={<Icon path={mdiPlayOutline} size="16px"></Icon>} primary>
					图标主要按钮
				</Button>
				<Button icon={<Icon path={mdiPlayOutline} size="16px"></Icon>} loading>
					图标按钮加载中
				</Button>
			</Space>
		</>
	)
}

export default ButtonExample
