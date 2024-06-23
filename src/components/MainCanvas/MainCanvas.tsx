import { memo } from 'react'
import './MainCanvas.css'

type Props = {
    canvasRef: React.RefObject<HTMLCanvasElement>
    onMouseMove: React.PointerEventHandler<HTMLCanvasElement> | undefined
    onClick: React.PointerEventHandler<HTMLCanvasElement> | undefined
    showEyeDropper: boolean
}

export const MainCanvas = memo(function ({
    canvasRef,
    onMouseMove,
    onClick,
    showEyeDropper,
}: Props) {
    return (
        <canvas
            ref={canvasRef}
            width="4000"
            height="4000"
            onPointerDown={showEyeDropper ? onClick : undefined}
            onPointerMove={showEyeDropper ? onMouseMove : undefined}
            className={showEyeDropper ? 'main-canvas' : undefined}
        ></canvas>
    )
})
