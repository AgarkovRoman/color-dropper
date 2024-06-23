import { EyedropperIcon } from '../../icons/EyeDropperIcon'
import './Header.css'

type Props = {
    onClick: () => void
    selectedColor: string
}

export function Header({ onClick, selectedColor }: Props) {
    return (
        <div className="header-container">
            <button onClick={onClick}>
                <EyedropperIcon />
            </button>
            Selected color: <span>{selectedColor}</span>
        </div>
    )
}
