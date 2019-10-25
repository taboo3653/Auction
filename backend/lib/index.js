"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./core/db");
const routes_1 = __importDefault(require("./routes"));
const socket_1 = __importDefault(require("./core/socket"));
const app = express_1.default();
const http = http_1.createServer(app);
const io = socket_1.default(http);
routes_1.default(app, io);
const API_PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('../frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../frontend', 'build', 'index.html')); // relative path
    });
}
http.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
