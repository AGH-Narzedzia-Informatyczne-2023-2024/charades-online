import { useState } from 'react'

interface EnterRoomPageInterface{
    changeStage: Function,
}

function EnterRoomPage({changeStage}: EnterRoomPageInterface) {
    const [username, setUsername] = useState('')

    return (
        <div className="flex flex-col items-center gap-5 bg-gray-800 h-screen">
            <h1 className="text-4xl font-bold text-white py-3">
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
                <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded text-3xl" onClick={()=>changeStage(1)}>Play!</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded text-2xl">Create Private Room</button>
            </div>
        </div>
    )
}

export default EnterRoomPage