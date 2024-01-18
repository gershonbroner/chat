import { Router, Request, Response } from "express";
import db from "../db/db";
const router = Router();

router.get("/getuserSearch", async (req: Request, res: Response) => {
   try{ 
    const userName = req.query.userName
    const user = await db('users')
    .select('*')
    .where('name', 'ILIKE', `%${userName}%`)
    .first();
    res.send(user)
   }catch(err){
    console.log("Error in getting user : ", err);
    return res.status(500).json({"error": "Internal Server Error"})
   }
    }) 
    export default router;