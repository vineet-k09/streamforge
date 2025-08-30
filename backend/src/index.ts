// backend/index.ts
import express = require("express");
import http = require("http")
const { Server } = require("socket.io");

require('dotenv').config();

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.NEXTJS_API,
    }
});

interface PriceUpdate {
    symbol: string;
    price: string;
};

io.on("connection", (socket: import("socket.io").Socket) => {
    console.log("New client connected: ", socket.id);

    setInterval(() => {
        const price = (30000 + Math.random() * 1000).toFixed(2);
        const update: PriceUpdate = { symbol: "BTC", price };
        socket.emit("priceUpdate", update);
    }, 1000);

    socket.on("disconnect", () => {
        console.log("Client disconnected: ", socket.id);
    });
});

app.get('/',(req,res)=>{
    const data = "hello world"
    res.send(data)
});

const port = process.env.PORT
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
});