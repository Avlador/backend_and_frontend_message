


import express, { type Request, type Response } from "express";
import cors from "cors";
// import { pool } from "./db";
import authRouter from "./api/auth";
import chatRouter from "./api/chat"; 
import { createServer } from 'http'; 
import { Server } from 'socket.io';


const app = express();

const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log(`EE, есть контакт: ${socket.id}`);

 socket.on("message:send", (data) => {
    console.log("Новое сообщение с фронтенда:", data);

    socket.broadcast.emit("message:received", data);
  });


  socket.on("disconnect", () => {
    console.log(`К сожелению вы отключились: ${socket.id}`);
  });
});


app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);  
app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok!!!!!!" });
});

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

httpServer.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Socket.IO is ready for connections!");
});
