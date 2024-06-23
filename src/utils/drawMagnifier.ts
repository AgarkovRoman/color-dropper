import { Coordinates } from '../types'

type Params = Coordinates & {
    targetCanvas: HTMLCanvasElement
    magnifierCanvas: HTMLCanvasElement
    magnifierCtx: CanvasRenderingContext2D
}

export const drawMagnifier = ({
    magnifierCtx,
    targetCanvas,
    magnifierCanvas,
    y,
    x,
}: Params): void => {
    const magnifierWidth = magnifierCanvas.width
    const magnifierHeight = magnifierCanvas.height
    const radius = magnifierWidth / 2

    magnifierCtx.clearRect(0, 0, magnifierWidth, magnifierHeight)

    // Clip to a circular region
    magnifierCtx.save()
    magnifierCtx.beginPath()
    magnifierCtx.arc(radius, radius, radius, 0, Math.PI * 2)
    magnifierCtx.clip()

    magnifierCtx.drawImage(targetCanvas, x - 10, y - 10, 20, 20, 0, 0, 200, 200)
}
