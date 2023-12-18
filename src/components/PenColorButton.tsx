interface PenColorButtonProps {
    color: string,
    onClick: () => void
}

function PenColorButton({color, onClick}: PenColorButtonProps) {
    return (
        <div style={{backgroundColor: color}} className="w-8 h-8 hover:cursor-pointer border-1 border-white" onClick={onClick}>
        </div>
    )
}

export default PenColorButton