import { Router, Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
const router = Router();

const posts = [
    {
        userName:"gershon broner"
    },
    {
        userName:"naama broner"
    }
]
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