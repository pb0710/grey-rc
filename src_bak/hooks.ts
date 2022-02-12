import { uuid } from 'gray-utils'
import { useEffect, useState } from 'react'

export function useUuId() {
	const [id, setId] = useState('')
	useEffect(() => {
		setId(uuid())
	}, [])
	return id
}
