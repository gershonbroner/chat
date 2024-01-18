import { Router, Request, Response } from "express";
import db from "../db/db";
const router = Router();

router.get("/sendMessages", async (req: Request, res: Response) => {
    const newMessage = {
       text: 'Hello, Knex!',
       id1: 1,
       id2: 2,
     };
     await db('messages') .insert(newMessage)
     res.send("hii")
     })
  export default router;