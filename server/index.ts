import express, { Request, Response } from "express";
import Login from "./routes/login"
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config({ path: "./.env" });
const app = express()
app.use(cors(
  {
    credentials:true,
    origin:'http://localhost:3000',
  }
));
app.use(express.json())
app.use(cookieParser());
app.use("/login",Login)
app.get('/', function (req:Request, res:Response) {
  res.send('Hello world')
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')}
)
