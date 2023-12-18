import { useEffect, useState } from 'react'
import './App.css'
import EnterRoomPage from './components/EnterRoomPage'
import GamePage from './components/GamePage';
import io, { Socket } from 'socket.io-client';

const socket = io("http://localhost:5000", 
//   {withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }}
  { transports: ['websocket'] }
);

function App() {
	const [gameStage, setGameStage] = useState(0);
	const [roomId, setRoomId] = useState("");
	
	const changeStage = (x: number)=> {
		console.log("CURRENT GAME STAGE ", gameStage+x)
		setGameStage(gameStage+x);
	}
	const sendRoomId = (roomId: string) => {
		setRoomId(roomId);
		setGameStage(1);
	}

	useEffect(()=>{
		const userId = localStorage.getItem("userId");
		socket.auth = { userId };
		socket.connect();
		console.log("userId in localStorage: ",userId )

		socket.on("session", ({ userId}) => {
			console.log("SESSION_ID FROM SERVER: ", userId);
			localStorage.setItem("userId", userId);
		});

		socket.on("joinRoom", ({key, room})=>{
			console.log("GAME EXISTS WITH ID: ", key);
			setRoomId(key);
			changeStage(1);
		})
	},[])

	return (
		<>
			{gameStage == 0 && <EnterRoomPage changeStage={changeStage} socket={socket} sendRoomId={sendRoomId}/>}
			{gameStage == 1 && <GamePage changeStage={changeStage} socket={socket} roomId={roomId}/>}
		</>
	)
}

export default App