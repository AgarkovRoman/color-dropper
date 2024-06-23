type Params = {
    src: string
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
}

export const loadImage = ({ src, ctx, canvas }: Params) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = src
    image.onload = () => ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
}
