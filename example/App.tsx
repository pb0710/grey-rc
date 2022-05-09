import React, { FC } from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import { cls } from 'grey-utils'
import './App.scss'
import router, { componentRoutes } from './routes'
import { Space } from '../packages'

const App: FC = () => {
	const contentEle = useRoutes(router)

	const navEle = (
		<Space direction="vertical" size="small">
			{componentRoutes.map(({ path, name }) => (
				<NavLink
					key={path}
					to={`/component/${path}`}
					className={({ isActive }) =>
						cls('nav-item', {
							active: isActive
						})
					}
				>
					<div className="wrap">{name}</div>
				</NavLink>
			))}
		</Space>
	)

	return (
		<div className="example">
			<div className="nav-bar">{navEle}</div>
			<div className="content">{contentEle}</div>
		</div>
	)
}

export default App
