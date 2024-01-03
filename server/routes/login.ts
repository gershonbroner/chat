import { Router, Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import db from "../db/db";
const router = Router();

const posts = [
    {
        userName:"gershon broner"
    },
    {
        userName:"naama broner"
    }
]
// get name/password of user check if exits on DB and create token for hime 
router.post("/authenticationANDtoken", async (req: Request, res: Response) => {
    // here need check if user by name and password ...//
const secret:any= process.env.ACCESS_TOKEN_SECRET ;
const userName =req.body.userName
const user ={name:userName}
const accessToken = jwt.sign(user,secret)
res.json({accessToken: accessToken })
})
router.get("/getRequest", authenticateToken, async (req: Request, res: Response) => {
res.json(posts.filter(post => post.userName === req.user.name ))
})
 // insert new user ...
 router.post('/addNewUser',async (req: Request, res:Response)=>{
    const user = {...req.body,id:uuidv4()}
        try{
            await db("users").insert(user)
            return res.status(201).send("user added") 
        }
        catch(err){
            console.log('error in adding a new user to the database')
            return res.status(500).send(`Error when creating the user ${err}`)
        }
 })
// middleware for authentication token
function authenticateToken(req: Request,res:Response,next:NextFunction){
const secret:any= process.env.ACCESS_TOKEN_SECRET 
const authHeader = req.headers['authorization']
const token = authHeader&&authHeader.split(' ')[1]
if(token == null) return res.sendStatus(401)
jwt.verify(token,secret,(err:any,user:any)=>{
    if (err) return res.sendStatus(403)
    req.user = user;
next()
})
}
export default router;