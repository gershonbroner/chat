import { Router, Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import db from "../db/db";
const router = Router();


router.post("/authenticationANDtoken", async (req: Request, res: Response) => {
// check if user exits
    const result = await db('users')
    .where({
      name: req.body.userName,
      password: req.body.password,
    })
    .first(); 
    console.log(result);
    
    if(result.length === 0){
     return res.status(404).send("Wrong username or password")
    }
    else{      
 const secret:any= process.env.ACCESS_TOKEN_SECRET ;
 const userName =req.body.userName
 const user ={name:result.name}
 const accessToken = jwt.sign(user,secret)
res.cookie('token', accessToken, {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 
  });
  return res.status(200).send({ message:"send token to cookie",dataUser:result})
 }
})
router.get("/getRequest", authenticateToken, async (req: Request, res: Response) => {
res.json(req.user.name )
})
 router.post('/addNewUser',async (req: Request, res:Response)=>{
    const user = {...req.body}
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