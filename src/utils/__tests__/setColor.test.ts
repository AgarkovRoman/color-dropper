import { Coordinates } from '../../types'
import { setColor } from '../setColor'

// Mocking CanvasRenderingContext2D and rgb-hex
class MockCanvasRenderingContext2D {
    getImageData() {
        return {
            data: [255, 0, 0, 255], // Mock data for testing
        }
    }
}

// Test suite for setColor function
describe('setColor', () => {
    it('should set the color to #FF0000', () => {
        const mockCtx = new MockCanvasRenderingContext2D() as unknown as CanvasRenderingContext2D
        const mockSetter = vi.fn()

        const params: Coordinates & {
            ctx: CanvasRenderingContext2D
            setter: (value: string) => void
        } = {
            x: 0,
            y: 0,
            ctx: mockCtx,
            setter: mockSetter,
        }

        setColor(params)

        expect(mockSetter).toHaveBeenCalledWith('#ff0000')
    })

    it('should set the color to #00FF00 for green pixel', () => {
        class MockGreenPixelCanvasRenderingContext2D {
            getImageData() {
                return {
                    data: [0, 255, 0, 255], // Mock data for green color
                }
            }
        }

        const mockCtx =
            new MockGreenPixelCanvasRenderingContext2D() as unknown as CanvasRenderingContext2D
        const mockSetter = vi.fn()

        const params: Coordinates & {
            ctx: CanvasRenderingContext2D
            setter: (value: string) => void
        } = {
            x: 0,
            y: 0,
            ctx: mockCtx,
            setter: mockSetter,
        }

        setColor(params)

        expect(mockSetter).toHaveBeenCalledWith('#00ff00')
    })

    it('should set the color to #0000FF for blue pixel', () => {
        class MockBluePixelCanvasRenderingContext2D {
            getImageData() {
                return {
                    data: [0, 0, 255, 255], // Mock data for blue color
                }
            }
        }

        const mockCtx =
            new MockBluePixelCanvasRenderingContext2D() as unknown as CanvasRenderingContext2D
        const mockSetter = vi.fn()

        const params: Coordinates & {
            ctx: CanvasRenderingContext2D
            setter: (value: string) => void
        } = {
            x: 0,
            y: 0,
            ctx: mockCtx,
            setter: mockSetter,
        }

        setColor(params)

        expect(mockSetter).toHaveBeenCalledWith('#0000ff')
    })

    it('should handle edge cases', () => {
        class MockEdgeCaseCanvasRenderingContext2D {
            getImageData() {
                return {
                    data: [255, 255, 255, 0], // Mock data for fully transparent white color
                }
            }
        }

        const mockCtx =
            new MockEdgeCaseCanvasRenderingContext2D() as unknown as CanvasRenderingContext2D
        const mockSetter = vi.fn()

        const params: Coordinates & {
            ctx: CanvasRenderingContext2D
            setter: (value: string) => void
        } = {
            x: 0,
            y: 0,
            ctx: mockCtx,
            setter: mockSetter,
        }

        setColor(params)

        expect(mockSetter).toHaveBeenCalledWith('#ffffff') // Transparency is ignored in this case
    })
})
