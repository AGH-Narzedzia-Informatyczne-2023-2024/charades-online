import { Socket } from "socket.io-client"
import DrawingMenu from "./DrawingMenu"
import GameSessionSettings from "./GameSessionSettings"
import { useEffect, useRef, useState } from "react"

interface GamePageInterface{
    changeStage: (index:number) => void,
    socket: Socket,
    roomId: string
}

function GamePage({changeStage, socket, roomId}: GamePageInterface) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    let isDrawing= false;
    let bounds: DOMRect;

    const [color, setColor] = useState("#000000");
    
    // Handle player left response
    useEffect(()=>{
        socket.on('playerLeft', (players) => {
            console.log("ROOM LEFT")
            changeStage(-1);
        });
        socket.on('canvasData', ({ imageData }) => {
            // Load and display the received image on the canvas
            const img = new Image();
            img.src = `data:image/png;base64,${imageData}`;

            img.onload = () => {
                const canvas:HTMLCanvasElement = canvasRef.current!
                if(canvas===null) return
                contextRef.current = canvas.getContext("2d")
                let context = contextRef.current;
                if(context===null || context===undefined) return 
              context.drawImage(img, 0, 0);
            };
          });
        
        const canvas:HTMLCanvasElement = canvasRef.current!
        if(canvas===null) return
        contextRef.current = canvas.getContext("2d")
        let context = contextRef.current;
        if(context===null || context===undefined) return

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = false;

        bounds = canvas.getBoundingClientRect()

        window.addEventListener("scroll", setBounds);
        window.addEventListener("resize", setBounds);

        


        return () => {
            window.removeEventListener("scroll", setBounds);
            window.removeEventListener("resize", setBounds);
        }
    }, [])

    const setBounds = () => {
        
        if(canvasRef.current === null) return
        //console.log("zmiana boundsow")
        bounds = canvasRef.current.getBoundingClientRect();
    }

    const leaveRoom = () => {
        console.log("LEAVING ROOM")
        socket.emit('leaveRoom', roomId);
    };

    const getColor = (color:string) => {
        console.log("KOLOR ", color);
        setColor(color);
    }

    const getXY = (event:any) => {
        const canvas:HTMLCanvasElement = canvasRef.current!
        if(canvas===null) return
        contextRef.current = canvas.getContext("2d")
        let context = contextRef.current;
        if(context===null || context===undefined) return

        bounds = canvas.getBoundingClientRect()

        let x = event.pageX - bounds.left - scrollX;
        let y = event.pageY - bounds.top - scrollY;
    
        x /= bounds.width;
        y /= bounds.height;
    
        x *= canvas.width;
        y *= canvas.height;
    
        return { x: x, y: y };
      };


    const start = (event:React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

        const canvas:HTMLCanvasElement = canvasRef.current!
        if(canvas==null) return
        contextRef.current = canvas.getContext("2d")
        let context = contextRef.current;
        if(context===null|| context===undefined) return

        isDrawing = true;
        const res = getXY(event);
        if(res === undefined) return;
        

        context.beginPath();
        context.moveTo(res.x, res.y);
        event.preventDefault();

      };

    const stop = (event:React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas:HTMLCanvasElement = canvasRef.current!
        if(canvas==null) return
        contextRef.current = canvas.getContext("2d")
        let context = contextRef.current;
        if(context===null|| context===undefined) return

        if (isDrawing) {
            context.stroke();
            context.closePath();
            isDrawing = false;
        }
    
        event.preventDefault();
      };

      const draw = (event:React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas:HTMLCanvasElement = canvasRef.current!
        if(canvas===null) return
        contextRef.current = canvas.getContext("2d")
        let context = contextRef.current;
        if(context===null || context===undefined) return

        if (isDrawing) {
            const res = getXY(event);
            if(res === undefined) return;
            context.strokeStyle = color;
            //context.lineWidth = this.drawWidth;
            context.lineTo(res.x, res.y);
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
        }
    
        event.preventDefault();

        var dataURL = canvas.toDataURL('image/jpeg',1);
        socket.emit('canvasData', dataURL);
      };

    return (
        <div className="flex flex-col items-center gap-3 bg-gray-800 h-screen">
            <GameSessionSettings/>
            <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xl" onClick={()=>leaveRoom()}>LEAVE</button>
            <div className="text-white">RoomCode: {roomId}</div>
            <div className="flex flex-row gap-3 w-full">
                <canvas 
                style={{width: "80%"}}
                className="border-2 border-black" 
                ref={canvasRef} 
                onMouseDown={(event) => start(event)}
                onMouseMove={(event) => draw(event)}
                onMouseUp={(event) => stop(event)}
                onMouseOut={(event) => stop(event)}
                ></canvas>
                <div>   
                    <div className="text-white">Zgadywane teksty</div>
                    <input type="text"></input>
                </div>
            </div>
            <DrawingMenu sendColor={getColor}/>
        </div>
    )
}

export default GamePage