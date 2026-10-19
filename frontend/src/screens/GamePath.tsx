import { useEffect, useState } from "react";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess,type Color, type Square } from "chess.js";

export const INIT_GAME="init_game"
export const MOVE="move"
export const GAME_OVER="game_over"

export const GamePath = () => {
  const socket=useSocket();

  const [chess,setChess]=useState(()=>new Chess())
  const [board,setBoard]=useState(chess.board())
  const [myColor,setMyColor]=useState<Color | null>(null)

  useEffect(()=>{
    if(!socket) return;

    socket.onmessage=(event)=>{
      const message=JSON.parse(event.data);
      console.log("message")

      switch(message.type){
        case INIT_GAME:
          chess.reset();
          setMyColor(message.payload.color === "black" ? "b" : "w")
          setBoard(chess.board())
          break

        case MOVE:
          const move=message.payload
          chess.move(move);
          setBoard(chess.board())
          break
    
        case GAME_OVER:
          break
      }
    }
  },[socket])

  if(!socket) return <div>Connecting.....</div>

  return (
    <div className="min-h-screen bg-[#262421] text-white flex justify-center items-center p-4">
      <div className="flex gap-6 w-full max-w-5xl">
        {/* Left: board */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[560px]">
            <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} myColor={myColor}/>
          </div>
        </div>

        {/* Right: panel */}
        <div className="w-80 bg-[#21201d] rounded-lg p-4 flex flex-col gap-4">
          <div className="bg-[#2b2926] rounded-lg py-3 px-4">10 min</div>
          <button className="bg-[#81b64c] hover:bg-[#95c15f] font-bold text-2xl py-4 rounded-lg"
          onClick={()=>{
            socket.send(JSON.stringify({
              type:INIT_GAME
            }))
          }}
          >
            Play
          </button>
          <button className="bg-[#2b2926] rounded-lg py-3">Play a Friend</button>
          <button className="bg-[#2b2926] rounded-lg py-3">Tournaments</button>
        </div>
      </div>
    </div>
  );
};