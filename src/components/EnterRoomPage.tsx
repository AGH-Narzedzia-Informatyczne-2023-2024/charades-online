import { useState } from 'react'
import Dot from './Dot';

interface EnterRoomPageInterface{
    changeStage: (index:number) => void
}

function EnterRoomPage({changeStage}: EnterRoomPageInterface) {
    const [username, setUsername] = useState('')
    const [activeDot, setActiveDot] = useState(0);

    const howToPlayPhrases = [
        "When it's your turn, choose a word you want to draw!",
        "Try to draw your choosen word! No spelling!",
        "Let other players try to guess your drawn word!",
        "When it's not your turn, try to guess what other players are drawing!",
        "Score the most points and be crowned the winner at the end!"
    ];

    function joinPrivateRoom() {
		alert('Joining a private room')
    }

    return (
        <div className="flex flex-col items-center bg-gray-800 h-screen">
            <div className="flex flex-col flex-[2_2_0%] items-center w-full">
                <h1 className="text-3xl font-bold text-white py-3 my-5">
                    Charades Online
                </h1>
                <div className="flex flex-col gap-3 bg-gray-700 p-3">
                    <input 
                        className="border outline-none p-1 text-2xl"
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-2xl" onClick={()=>changeStage(1)}>Play!</button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xl" onClick={joinPrivateRoom}>Create Private Room</button>
                </div>
            </div>
            <div className="flex bg-gray-700 w-full flex-1 justify-center p-3">
                <div className='flex flex-row w-1/2 text-center'>
                    <div className="flex flex-col gap-3 bg-gray-800 p-3 m-5 rounded-lg basis-full hover:scale-105">
                        <p className="text-2xl text-white text-center my-5">About the project</p>
                        <p className="text-white my-3 mx-2">A web project representing the well-known online game - charades. A canvas-based game where you can create a room and play online with your friends!</p>
                        <a href="https://github.com/AGH-Narzedzia-Informatyczne-2023-2024/charades-online" className="text-blue-200 hover:underline" target="_blank">GitHub repository</a>
                    </div>

                    <div className="flex flex-col gap-3 bg-gray-800 p-3 m-5 rounded-lg basis-full hover:scale-105">
                        <p className="text-2xl text-white text-center my-5">How to play?</p>
                        <p className="text-white my-3 mx-2 grow">{howToPlayPhrases[activeDot]}</p>
                        <div className='flex flex-row justify-center vertical-bottom'>
                            {howToPlayPhrases.map((name, index) =>
                                <Dot onClick={(index:number) => setActiveDot(index)} index={index} activeDot={activeDot} key={index}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnterRoomPage