function EnterRoomPage() {
    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold">
			    Charades Online
		    </h1>
            <input type="text" placeholder="Enter your name" />
            <button>Play!</button>
            <button>Create Private Room</button>
        </div>
    )
}

export default EnterRoomPage