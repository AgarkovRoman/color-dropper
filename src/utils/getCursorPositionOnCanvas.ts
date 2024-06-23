import { PointerEvent } from 'react'
import { Coordinates } from '../types'

type Params = {
    event: PointerEvent
    canvas: HTMLCanvasElement
}

export const getCursorPositionOnCanvas = ({ event, canvas }: Params): Coordinates => {
    const rect = canvas.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    return { x, y }
}
