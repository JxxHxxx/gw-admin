import { ReactNode } from "react"

export interface ModalProp {
    children : ReactNode
    title : string
    isOpen : boolean
    setIsOpen : (isOpen:boolean) => void
    styles?: object
}