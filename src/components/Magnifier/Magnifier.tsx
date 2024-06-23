import './Magnifier.css'
import { useEffect } from 'react'
import { CircleIcon } from '../../icons/CircleIcon.tsx'
import { Center } from '../../icons/Center.tsx'

type Props = {
    canvasRef: React.RefObject<HTMLCanvasElement>
    x: number
    y: number
    color: string
}

export function Magnifier({ canvasRef, y, x, color }: Props) {
    useEffect(() => {
        const magnifier = canvasRef.current
        const magnifierCtx = magnifier?.getContext('2d')
        magnifierCtx!.imageSmoothingEnabled = false
    }, [canvasRef])

    return (
        <div
            className="magnifier-container"
            style={{
                top: `${y}px`,
                left: `${x}px`,
            }}
        >
            <CircleIcon color={color} />
            <Center />
            <div className="color-badge">{color}</div>
            <canvas ref={canvasRef} width="200" height="200"></canvas>
        </div>
    )
}
