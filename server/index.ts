import express, { Request, Response } from "express";
import Login from "./routes/login"
import Users from './routes/users'
import messages from './routes/messages'
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { Server,Socket } from "socket.io";
import http from "http";
dotenv.config({ path: "./.env" });
import { socket } from "./socket";
const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  },
});

app.use(cors(
  {
    credentials:true,
    origin:'http://localhost:3000',
  }
));
socket(io)
app.use(express.json())
app.use(cookieParser());
app.use("/login",Login)
app.use("/users",Users)
app.use("/messages",messages)
app.get('/', function (req:Request, res:Response) {
  res.send('Hello world')
})
server.listen(3001, () => {
    console.log('Server is running on port 3001')}
)
