import { Coordinates } from '../types'
import rgbHex from 'rgb-hex'

type Params = Coordinates & {
    ctx: CanvasRenderingContext2D
    setter: (value: string) => void
}

export const setColor = ({ x, y, ctx, setter }: Params): void => {
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data
    const hex = rgbHex(r, g, b)

    setter(`#${hex}`)
}
