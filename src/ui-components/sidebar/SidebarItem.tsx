import { PropsWithChildren, CSSProperties, FC, useEffect } from "react"
import { useDrag } from "react-dnd"

import { ItemTypes } from "../../utils/ItemTypes"

const style: CSSProperties = {
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    cursor: "move",
    float: "left",
}

export interface BoxProps {
    name: string
}

interface DropResult {
    name: string
}

interface SidebarItemProps extends PropsWithChildren {
    name: string
    handler: any
}

export const SidebarItem = function Box({
    name,
    children,
    handler,
}: SidebarItemProps) {
    const [{ isDragging, position, pos }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { name },
        end: (item, monitor) => {
            console.log(monitor)
            const dropResult = monitor.getDropResult<DropResult>()
            const gg = monitor.getInitialSourceClientOffset()
            const ggg = monitor.getDifferenceFromInitialOffset()

            if (item && dropResult) {
                handler()
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
            position: monitor.getDifferenceFromInitialOffset(),
            pos: monitor.getInitialClientOffset(),
        }),
    }))

    useEffect(() => {
        console.log(position, pos)
    }, [position, pos])

    return (
        <div ref={drag} data-testid={`box`}>
            {children}
        </div>
    )
}
