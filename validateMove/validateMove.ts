import {Piece} from "../pieces";

//validate pawn move
export function validatePawnMove(pawn:Piece,currX:number,currY:number,finalX:number,finalY:number,board:Piece[][]):boolean{
    const dx=finalX-currX;
    const dy=finalY-currY;

    const direction = pawn.color === "white" ?-1:1;

    if(dx==0 && dy==0) return false;

    if(dx!=direction) return false;


    if(finalX<0 || finalX>=8 || finalY<0 || finalY>=8) return false;


    if((Math.abs(dx)>2 || Math.abs(dy)>1 )) return false;

    if(Math.abs(dy)==1){
        if(!board[finalX][finalY]) return false;

        const targetColor=board[finalX][finalY].color;
        if(pawn.color==targetColor) return false;

        return true;

    }

    //dy==0
    if(Math.abs(dx)==2){
        if(pawn.hasMoved) return false;

    }
    if(board[finalX][finalY]) return false;

    return true;
}

export function validateKnightMove(knight:Piece,currX:number,currY:number,finalX:number,finalY:number,board:Piece[][]):boolean{
    const dx=finalX-currX;
    const dy=finalY-currY;

    const deltaX=Math.abs(dx);
    const deltaY=Math.abs(dy);

    if(dx==0 && dy==0) return false;

    if((deltaX==2 && deltaY!=1) || (deltaX==1 && deltaY!=2)) return false;

    if(finalX<0 || finalX>=8 || finalY<0 || finalY>=8) return false;
    
    const target=board[finalX][finalY];
    if(target && knight.color==target.color) return false;

    return true;
}

export function validateRookMove(rook:Piece,currX:number,currY:number,finalX:number,finalY:number,board:Piece[][]):boolean{
    const dx=finalX-currX;
    const dy=finalY-currY;

    if(dx==0 && dy==0) return false;

    const deltaX=Math.abs(dx);
    const deltaY=Math.abs(dy);


    if(finalX<0 || finalX>=8 || finalY<0 || finalY>=8) return false;

    if(deltaX>0 && deltaY>0) return false;

    const target=board[finalX][finalY];
    if(target && rook.color==target.color) return false;

    let inBetween=false;
    if(deltaX==0){
        //check in y
        const direction=(dy>0)?1:-1

        for(let y=currY+direction;y!=finalY;y+=direction){
            if(board[currX][y]){
                inBetween=true;
                break
            }
        }

    }
    if(deltaY==0){
        //check in x
        const direction=(dx>0)?1:-1

        for(let x=currX+direction;x!==finalX;x+=direction){
            if(board[x][currY]){
                inBetween=true;
                break
            }
        }
    }

    if(inBetween) return false;

    return true;
}

export function validateBishopMove(bishop:Piece,currX:number,currY:number,finalX:number,finalY:number,board:Piece[][]):boolean{
    const dx=finalX-currX;
    const dy=finalY-currY;

    const deltaX=Math.abs(dx);
    const deltaY=Math.abs(dy);

    if(finalX<0 || finalX>=8 || finalY<0 || finalY>=8) return false;

    if(deltaX!==deltaY) return false;

    const target = board[finalX][finalY];

    if (target && target.color === bishop.color) {
        return false;
    }

    const directionX = dx > 0 ? 1 : -1;
    const directionY = dy > 0 ? 1 : -1;

    let x = currX + directionX;
    let y = currY + directionY;
    while(x!==finalX && y!==finalY){
        if(board[x][y]) return false;
        
        x+=directionX
        y+=directionY
    }
    
    return true;
}

export function validateKingMove(king:Piece,currX:number,currY:number,finalX:number,finalY:number,board:Piece[][]):boolean{
    const dx=finalX-currX;
    const dy=finalY-currY;

    const deltaX=Math.abs(dx);
    const deltaY=Math.abs(dy);

    if(finalX<0 || finalX>=8 || finalY<0 || finalY>=8) return false;

    if(deltaX==0 && deltaY==0) return false;

    if(deltaX>1 || deltaY>1) return false;

    const target = board[finalX][finalY];
    if (target && target.color === king.color) {
        return false;
    }

    //later we need to check if finalX and finalY are check points for king
    return true;
}

export function validateQueenMove(queen:Piece,currX:number,currY:number,finalX:number,finalY:number,board:Piece[][]):boolean{
    const dx=finalX-currX;
    const dy=finalY-currY;

    const deltaX=Math.abs(dx);
    const deltaY=Math.abs(dy);

    if(finalX<0 || finalX>=8 || finalY<0 || finalY>=8) return false;

    if(deltaX==0 && deltaY==0) return false;

    if(deltaX==deltaY){
        if(validateBishopMove(queen,currX,currY,finalX,finalY,board)) return true;
    }

    if(deltaX==0 || deltaY==0){
        if(validateRookMove(queen,currX,currY,finalX,finalY,board)) return true;
    }
    
    return false;
}
