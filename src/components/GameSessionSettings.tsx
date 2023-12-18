

interface GameSessionSettingsInterface{
    changeStage: (index:number) => void
}
//{changeStage}: GameSessionSettingsInterface
function GameSessionSettings() {

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex flex-row items-center flex-wrap gap-5">
                <div className="flex flex-col gap-1">
                    <label className="text-white">Ilość graczy</label>
                    <input className="focus:outline-none p-1" type="number" placeholder="5"></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-white">Do ilu punktów gramy?</label>
                    <input className="focus:outline-none p-1" type="number" placeholder="5"></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-white">Czas na rysowanie(w s)</label>
                    <input className="focus:outline-none p-1" type="number" placeholder="80"></input>
                </div>
            </div>
            <button className="w-fit bg-green-600 hover:bg-green-800 text-white px-2 py-1 rounded text-x">Rozpocznij grę!</button> 
        </div>
    )
}

export default GameSessionSettings