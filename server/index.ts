import express, { Request, Response } from "express";
import Login from "./routes/login"
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express()
app.use(express.json())
app.use("/login",Login)
app.get('/', function (req:Request, res:Response) {
  res.send('Hello world')
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')}
)
