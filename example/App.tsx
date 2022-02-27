import React, { FC } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import { cls } from 'gray-utils'
import './App.scss'
import ExampleIndex from './views/ExampleIndex'
import ButtonExample from './views/ButtonExample'
import SwitchExample from './views/SwitchExample'
import RadioExample from './views/RadioExample'
import CheckboxExample from './views/CheckboxExample'
import InputExample from './views/InputExample'
import Space from '../packages/modules/basic/Space'
import TooltipExample from './views/TooltipExample'
import CollapseExample from './views/CollapseExample'
import LoadingExample from './views/LoadingExample'
import ListExample from './views/ListExample'

const App: FC = () => {
	const getNavCls = (props: { isActive: boolean }): string =>
		cls('nav-item', {
			active: props.isActive
		})
	return (
		<div className="example">
			<div className="nav-bar">
				<Space direction="vertical" size="small">
					<NavLink to="/" className={getNavCls}>
						<div className="wrap">Index</div>
					</NavLink>
					<NavLink to="/button" className={getNavCls}>
						<div className="wrap">Button</div>
					</NavLink>
					<NavLink to="/switch" className={getNavCls}>
						<div className="wrap">Switch</div>
					</NavLink>
					<NavLink to="/radio" className={getNavCls}>
						<div className="wrap">Radio</div>
					</NavLink>
					<NavLink to="/checkbox" className={getNavCls}>
						<div className="wrap">Checkbox</div>
					</NavLink>
					<NavLink to="/input" className={getNavCls}>
						<div className="wrap">Input</div>
					</NavLink>
					<NavLink to="/tooltip" className={getNavCls}>
						<div className="wrap">Tooltip</div>
					</NavLink>
					<NavLink to="/collapse" className={getNavCls}>
						<div className="wrap">Collapse</div>
					</NavLink>
					<NavLink to="/loading" className={getNavCls}>
						<div className="wrap">Loading</div>
					</NavLink>
					<NavLink to="/list" className={getNavCls}>
						<div className="wrap">List</div>
					</NavLink>
				</Space>
			</div>
			<div className="content">
				<Routes>
					<Route path="/">
						<Route index element={<ExampleIndex />} />
						<Route path="button" element={<ButtonExample />} />
						<Route path="switch" element={<SwitchExample />} />
						<Route path="radio" element={<RadioExample />} />
						<Route path="checkbox" element={<CheckboxExample />} />
						<Route path="input" element={<InputExample />} />
						<Route path="tooltip" element={<TooltipExample />} />
						<Route path="collapse" element={<CollapseExample />} />
						<Route path="loading" element={<LoadingExample />} />
						<Route path="list" element={<ListExample />} />
					</Route>
				</Routes>
			</div>
		</div>
	)
}

export default App
