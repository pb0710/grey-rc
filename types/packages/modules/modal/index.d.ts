import { FC, HTMLAttributes } from 'react'
import './modal.scss'
interface ModalProps extends HTMLAttributes<HTMLElement> {
	visible?: boolean
	maskClassName?: string
	maskClosable?: boolean
	onCancel?: () => void
}
declare const Modal: FC<ModalProps>
export default Modal
