export type PieceType = "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"

export type PieceColor = "black" | "white"

export type Piece={
    id:number,
    type:PieceType,
    color:PieceColor,
    hasMoved:boolean
}