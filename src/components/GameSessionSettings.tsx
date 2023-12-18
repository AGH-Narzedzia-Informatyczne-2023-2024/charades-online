

interface GameSessionSettingsInterface{
    changeStage: (index:number) => void
}
//{changeStage}: GameSessionSettingsInterface
function GameSessionSettings() {

    return (
        <div className="flex flex-col items-center">
           <input type="number" placeholder="5"></input>
           <label>Ilość graczy</label>

           <input type="number" placeholder="5"></input>
           <label>Do ilu punktów gramy?</label>

           <input type="number" placeholder="80"></input>
           <label>Czas na rysowanie(w s)</label>


            <button className="bg-green-600 hover:bg-green-800 text-white px-2 py-1 rounded text-x">Rozpocznij grę!</button> 
        </div>
    )
}

export default GameSessionSettings