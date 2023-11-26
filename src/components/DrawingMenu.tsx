import { useState } from "react"
import PenColorButton from "./PenColorButton"

function DrawingMenu() {
    const [color, setColor] = useState("#000000")
    const [penSize, setPenSize] = useState(1)

    const penColors = [
        "#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff",
        "#ffa500", "#008080", "#654321", "#03fca1", "#ffb8e8", "#facda5"
    ]

    const penSizeIncrementAmount = 1
    const penSizeHandler = (incrementAmount: number) => {
        if(penSize + incrementAmount >= 1) {
            setPenSize(penSize + incrementAmount)
        } else {
            setPenSize(1)
        }
    }

    return (
        <>
            <div className="flex flex-row gap-3">
                {penColors.map(color => <PenColorButton color={color} onClick={() => setColor(color)} />)}
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-1xl">Clear canvas</button>
            </div>
            <p className="text-white">Pen color: {color}</p>
            <div className="flex flex-row gap-3 mt-2">
                <p className="text-white">Pen size: {penSize}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 w-8 h-8 rounded text-1xl"
                onClick={() => penSizeHandler(-penSizeIncrementAmount)}>-</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 w-8 h-8 rounded text-1xl"
                onClick={() => penSizeHandler(penSizeIncrementAmount)}>+</button>
            </div>
        </>
    )
}

export default DrawingMenu
