import { memo } from 'react'
import { EyedropperIcon } from '../../icons/EyeDropperIcon'

const getEyeDropper = () => {
    const EyeDropper = (window as any).EyeDropper
    if (EyeDropper === undefined) {
        console.error('Your browser does not support the EyeDropper API')
        return
    }
    const eyeDropper = new EyeDropper()

    return (callback: (color: string) => void) => {
        eyeDropper.open().then((result: { sRGBHex: string }) => {
            callback(result.sRGBHex)
        })
    }
}

const EyeDropperRaw = ({ onChange }: { onChange: (rgb: string) => void }) => {
    const open = getEyeDropper()

    const clickHandler = () => open?.(onChange)

    return (
        <button disabled={open === undefined} onClick={clickHandler}>
            <EyedropperIcon />
        </button>
    )
}

export const NativeEyeDropper = memo(EyeDropperRaw)
