import { PointerEvent } from 'react'
import { Coordinates } from '../../types'
import { getCursorPositionOnCanvas } from '../getCursorPositionOnCanvas'

// Mocking HTMLCanvasElement and PointerEvent
class MockCanvas {
    getBoundingClientRect() {
        return {
            left: 10,
            top: 10,
            right: 100,
            bottom: 100,
            width: 90,
            height: 90,
        }
    }
}

class MockPointerEvent {
    clientX: number
    clientY: number

    constructor(clientX: number, clientY: number) {
        this.clientX = clientX
        this.clientY = clientY
    }
}

describe('getCursorPositionOnCanvas', () => {
    it('should return correct cursor position', () => {
        const mockCanvas = new MockCanvas() as unknown as HTMLCanvasElement
        const mockEvent = new MockPointerEvent(50, 60) as unknown as PointerEvent

        const params = {
            event: mockEvent,
            canvas: mockCanvas,
        }

        const position: Coordinates = getCursorPositionOnCanvas(params)

        expect(position).toEqual({ x: 40, y: 50 })
    })

    it('should handle cursor at the top-left corner', () => {
        const mockCanvas = new MockCanvas() as unknown as HTMLCanvasElement
        const mockEvent = new MockPointerEvent(10, 10) as unknown as PointerEvent

        const params = {
            event: mockEvent,
            canvas: mockCanvas,
        }

        const position: Coordinates = getCursorPositionOnCanvas(params)

        expect(position).toEqual({ x: 0, y: 0 })
    })

    it('should handle cursor at the bottom-right corner', () => {
        const mockCanvas = new MockCanvas() as unknown as HTMLCanvasElement
        const mockEvent = new MockPointerEvent(100, 100) as unknown as PointerEvent

        const params = {
            event: mockEvent,
            canvas: mockCanvas,
        }

        const position: Coordinates = getCursorPositionOnCanvas(params)

        expect(position).toEqual({ x: 90, y: 90 })
    })

    it('should handle cursor outside the canvas', () => {
        const mockCanvas = new MockCanvas() as unknown as HTMLCanvasElement
        const mockEvent = new MockPointerEvent(5, 5) as unknown as PointerEvent

        const params = {
            event: mockEvent,
            canvas: mockCanvas,
        }

        const position: Coordinates = getCursorPositionOnCanvas(params)

        expect(position).toEqual({ x: -5, y: -5 })
    })
})
