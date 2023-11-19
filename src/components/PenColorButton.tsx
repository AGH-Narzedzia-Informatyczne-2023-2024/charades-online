interface PenColorButtonProps {
    color: string,
    onClick: () => void
}

function PenColorButton({color, onClick}: PenColorButtonProps) {
    return (
        <div style={{backgroundColor: color}} className="w-8 h-8 hover:cursor-pointer" onClick={onClick}>
        </div>
    )
}

export default PenColorButton