import { WebSocket } from "ws";
export declare class Game {
    player1: WebSocket;
    player2: WebSocket;
    private board;
    private moves;
    private startTime;
    constructor(player1: WebSocket, player2: WebSocket);
    makeMove(user: WebSocket, move: {
        from: string;
        to: string;
    }): void;
}
//# sourceMappingURL=Game.d.ts.map