import React, { useEffect, useState } from 'react'
import { Divider, Radio, Tabs } from '../../packages'

const TabsExample = () => {
	const [tabsType, setTabsType] = useState<'line' | 'round' | 'segment'>('line')

	const [tabsValue, setTabsValue] = useState<'a' | 'b' | 'c'>('a')
	useEffect(() => {
		setTimeout(() => {
			setTabsValue('c')
		}, 3000)
	}, [])

	return (
		<>
			<h1>Tabs</h1>
			<Radio.Group
				type="tab"
				defaultValue={'line'}
				value={tabsType}
				onChange={value => {
					setTabsType(value as any)
				}}
			>
				<Radio label="line">Line</Radio>
				<Radio label="round">Round</Radio>
				<Radio label="segment">Button</Radio>
			</Radio.Group>
			<Divider />
			<Tabs type={tabsType}>
				<Tabs.Panel name="a" tab="Tab A">
					aaa
				</Tabs.Panel>
				<Tabs.Panel name="b" tab="Tab B">
					bbb
				</Tabs.Panel>
				<Tabs.Panel name="c" tab="Tab C">
					ccc
				</Tabs.Panel>
			</Tabs>
			<Divider />
			<Tabs lazyLoad>
				<Tabs.Panel name="a" tab="Tab A">
					aaa
				</Tabs.Panel>
				<Tabs.Panel name="b" tab="Tab B">
					bbb
				</Tabs.Panel>
				<Tabs.Panel name="c" tab="Tab C">
					ccc
				</Tabs.Panel>
			</Tabs>
			<Divider />
			<Tabs value={tabsValue} onChange={setTabsValue as any}>
				<Tabs.Panel name="a" tab="Tab A">
					aaa
				</Tabs.Panel>
				<Tabs.Panel name="b" tab="Tab B">
					bbb
				</Tabs.Panel>
				<Tabs.Panel name="c" tab="Tab C">
					ccc
				</Tabs.Panel>
			</Tabs>
		</>
	)
}

export default TabsExample
