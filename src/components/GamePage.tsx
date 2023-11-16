interface GamePageInterface{
    changeStage: Function,
}

function GamePage({changeStage}: GamePageInterface) {

    return (
        <div className="flex flex-col items-center gap-3 bg-gray-800 h-screen">
            <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xl" onClick={()=>changeStage(-1)}>LEAVE</button>
            <div className="flex flex-row">
                <canvas width={100} height={100}></canvas>
                <div>   
                    <div>Zgadywane teksty</div>
                    <input type="text"></input>
                </div>
            </div>
        </div>
    )
}

export default GamePage