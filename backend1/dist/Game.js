import { WebSocket } from "ws";
import { Chess } from 'chess.js';
import { GAME_OVER, MOVE } from "./messages.js";
export class Game {
    player1;
    player2;
    board;
    moves;
    startTime;
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
    }
    makeMove(user, move) {
        if (this.player1 === user || this.player2 === user) {
            //if player 2 is trying to move but its player 1's turn
            if (this.board.moves.length % 2 === 0 && user !== this.player1)
                return;
            //if player 1 is trying to move but its player 2's turn
            if (this.board.moves.length % 2 === 1 && user !== this.player2)
                return;
            //validate the move structure by zod schema
            //validate the move
            try {
                this.board.move(move);
            }
            catch (e) {
                return;
            }
            if (this.board.isGameOver()) {
                this.player1.send(JSON.stringify({
                    type: GAME_OVER,
                    payload: {
                        winner: this.board.turn() === 'w' ? 'black' : 'white'
                    }
                }));
                return;
            }
            if (this.board.moves.length % 2 === 0) {
                this.player2.send(JSON.stringify({
                    type: MOVE,
                    payload: move
                }));
            }
            else {
                this.player1.send(JSON.stringify({
                    type: MOVE,
                    payload: move
                }));
            }
        }
    }
}
//# sourceMappingURL=Game.js.map