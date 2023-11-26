import DrawingMenu from "./DrawingMenu"

interface GamePageInterface{
    changeStage: (index:number) => void
}

function GamePage({changeStage}: GamePageInterface) {

    return (
        <div className="flex flex-col items-center gap-3 bg-gray-800 h-screen">
            <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xl" onClick={()=>changeStage(-1)}>LEAVE</button>
            <div className="flex flex-row gap-3">
                <canvas width={200} height={200} className="border-2 border-black"></canvas>
                <div>   
                    <div className="text-white">Zgadywane teksty</div>
                    <input type="text"></input>
                </div>
            </div>
            <DrawingMenu />
        </div>
    )
}

export default GamePage