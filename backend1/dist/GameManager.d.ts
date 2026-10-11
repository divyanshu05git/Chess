import { WebSocket } from "ws";
export declare class GameManager {
    private games;
    private users;
    private pendingUser;
    constructor();
    addUser(user: WebSocket): void;
    removeUser(user: WebSocket): void;
    private addHandler;
}
//# sourceMappingURL=GameManager.d.ts.map