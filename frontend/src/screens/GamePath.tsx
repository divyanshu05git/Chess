import  {ChessBoard}  from "../components/ChessBoard"

export const GamePath=()=>{
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div>
                <ChessBoard/>
                Play
            </div>
        </div>
    )
}