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

export function validateBishopMove(rook:Piece,currX:number,currY:number,finalX:number,finalY:number,board:Piece[][]):boolean{
    return true;
}

