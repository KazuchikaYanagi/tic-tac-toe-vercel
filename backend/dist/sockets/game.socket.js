"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGameSocket = void 0;
const socket_io_1 = require("socket.io");
const user_model_1 = require("../models/user.model");
const rooms = {};
const setupGameSocket = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "https://tic-tac-toe-chi-pink.vercel.app",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("joinRoom", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { roomId, userId } = data;
            socket.join(roomId);
            if (!rooms[roomId]) {
                rooms[roomId] = [];
            }
            const players = rooms[roomId];
            players.push({ socketId: socket.id, userId });
            if (players.length === 1) {
                players[0].symbol = "X";
            }
            else if (players.length === 2) {
                players[1].symbol = "O";
                // to start playing game to confirm 2 players
                // increment matches to 1
                for (const p of players) {
                    yield user_model_1.User.findByIdAndUpdate(p.userId, { $inc: { matches: 1 } });
                }
                // sending startGame event to both of players
                for (const p of players) {
                    io.to(p.socketId).emit("startGame", {
                        playerSymbol: p.symbol,
                        currentPlayer: "X", // always start from X
                    });
                }
            }
        }));
        socket.on("makeMove", (data) => {
            const { roomId, move } = data;
            const players = rooms[roomId];
            if (!players)
                return;
            // do not take current currentPlayer from client
            // manage client base for this app
            // to decide next turn, check the number of X and O in comparison
            const xCount = move.board.filter((c) => c === "X").length;
            const oCount = move.board.filter((c) => c === "O").length;
            const nextPlayer = xCount > oCount ? "O" : "X";
            io.to(roomId).emit("moveMade", {
                board: move.board,
                currentPlayer: nextPlayer,
            });
        });
        socket.on("gameOver", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { roomId, winnerId } = data;
            const players = rooms[roomId];
            if (!players)
                return;
            // when won, increment wins to 1
            if (winnerId) {
                yield user_model_1.User.findByIdAndUpdate(winnerId, { $inc: { win: 1 } });
            }
            io.to(roomId).emit("gameOver", { winnerId });
            delete rooms[roomId];
        }));
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            // delete from room
            for (const roomId in rooms) {
                rooms[roomId] = rooms[roomId].filter((p) => p.socketId !== socket.id);
                if (rooms[roomId].length === 0) {
                    delete rooms[roomId];
                }
            }
        });
    });
};
exports.setupGameSocket = setupGameSocket;
