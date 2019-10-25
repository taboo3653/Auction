"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
exports.default = (http) => {
    const io = socket_io_1.default(http);
    io.on('connection', function (socket) {
        let roomId;
        socket.on('LOT:JOIN', (lotId) => {
            roomId = 'LOT/' + lotId;
            socket.join(roomId);
        });
        socket.on('LOT:LEAVE', () => {
            if (roomId)
                socket.leave(roomId);
        });
    });
    return io;
};
