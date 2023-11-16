import { useState } from 'react'
import './App.css'
import EnterRoomPage from './components/EnterRoomPage'
import GamePage from './components/GamePage';

function App() {
	const [gameStage, setGameStage] = useState(0);

	const changeStage = (x: number)=> {
		setGameStage(gameStage+x);
	}

	return (
		<>
			{gameStage == 0 && <EnterRoomPage changeStage={changeStage}/>}
			{gameStage == 1 && <GamePage changeStage={changeStage}/>}
		</>
	)
}

export default App