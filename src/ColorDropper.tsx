import { PointerEvent, useCallback, useEffect, useRef, useState } from 'react'
import { loadImage } from './utils/loadImage'
import { getCursorPositionOnCanvas } from './utils/getCursorPositionOnCanvas'
import { setColor } from './utils/setColor'
import { drawMagnifier } from './utils/drawMagnifier'
import { Header } from './components/Header/Header'
import { MainCanvas } from './components/MainCanvas/MainCanvas'
import { Magnifier } from './components/Magnifier/Magnifier'

type Props = {
    imageSrc: string
}

export function ColorDropper({ imageSrc }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const magnifierRef = useRef<HTMLCanvasElement>(null)

    const [selectedColor, setSelectedColor] = useState<string>('')
    const [hexColor, setHexColor] = useState<string>('')
    const [showEyeDropper, setShowEyeDropper] = useState<boolean>(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    // Load image and draw into canvas
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d', { willReadFrequently: true })
        if (!ctx || !canvas) {
            console.error('Unable to load image')
            return
        }
        loadImage({ src: imageSrc, ctx, canvas })
    }, [imageSrc])

    const handleMouseMove = useCallback(
        (event: PointerEvent) => {
            const canvas = canvasRef.current
            const magnifier = magnifierRef.current
            const canvasCtx = canvas?.getContext('2d')
            const magnifierCtx = magnifier?.getContext('2d')

            if (!canvas || !magnifier || !magnifierCtx || !canvasCtx) {
                console.error('Canvas error')
                return
            }

            const { x, y } = getCursorPositionOnCanvas({ event, canvas })

            setColor({ x, y, ctx: canvasCtx, setter: setHexColor })

            setMousePos({ x: event.clientX + window.scrollX, y: event.clientY + window.scrollY })

            drawMagnifier({ x, y, magnifierCtx, targetCanvas: canvas, magnifierCanvas: magnifier })
        },
        [canvasRef, magnifierRef]
    )

    const handleClick = useCallback(
        (event: PointerEvent) => {
            const canvas = canvasRef.current
            const canvasCtx = canvas?.getContext('2d')

            if (!canvas || !canvasCtx) {
                console.error('Error with canvas')
                return
            }

            const { x, y } = getCursorPositionOnCanvas({ event, canvas })

            setColor({ x, y, ctx: canvasCtx, setter: setSelectedColor })
        },
        [canvasRef]
    )

    const handleShowEyeDropper = () => setShowEyeDropper((prevState) => !prevState)

    return (
        <>
            <Header onClick={handleShowEyeDropper} selectedColor={selectedColor} />
            <MainCanvas
                canvasRef={canvasRef}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                showEyeDropper={showEyeDropper}
            />
            {showEyeDropper && (
                <Magnifier
                    canvasRef={magnifierRef}
                    color={hexColor}
                    y={mousePos.y}
                    x={mousePos.x}
                />
            )}
        </>
    )
}
