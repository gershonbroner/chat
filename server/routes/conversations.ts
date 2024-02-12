import { Router, Request, Response,NextFunction } from "express";
import db from "../db/db";

const router = Router();

router.get("/getAllConversationsOfUser/:Id", async (req: Request, res: Response) => {
    const userId = req.params.Id;

    try {
        const conversations: any[] = await db.select('conversations.*')
            .from('conversations')
            .innerJoin('users as u1', 'conversations.IDsensed', 'u1.id')
            .innerJoin('users as u2', 'conversations.IDgetter', 'u2.id')
            .where('u1.id', '=', userId)
            .orWhere('u2.id', '=', userId);

        const conversationsWithMessagesPromises = conversations.map(conversation => {
            const messagesPromise = db.select('*')
                .from('messages')
                .where('IdConversation', conversation.id);

            const secondUserId = conversation.IDsensed === userId ? conversation.IDgetter : conversation.IDsensed;
            const userPromise = db.select('*')
                .from('users')
                .where('id', secondUserId)
                .first(); // Assuming there's only one user with the ID

            return Promise.all([messagesPromise, userPromise])
                .then(([messages, user]) => {
                    conversation.messages = messages;
                    conversation.secondUser = user;
                    return conversation;
                });
        });

        const conversationsWithMessages = await Promise.all(conversationsWithMessagesPromises);
        res.send(conversationsWithMessages);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).send('Error fetching conversations');
    }
});

router.post('/addConversation',async (req: Request, res:Response)=>{
    try{
     const   conversations = {...req.body}
        await db("conversations").insert(conversations)
        return res.status(201).send("conversations added") 
    }
    catch(err){
        return res.status(500).send(`Error when creating the user ${err}`)
    }
    
})

router.post('/findUserAndAddConversation', async (req: Request, res: Response) => {
    try {
        const { myId, userSearch } = req.body;
        const user = await db('users')
            .select('*')
            .where('name', 'ILIKE', `%${userSearch}%`)
            .first();

        if (!user) {
            return res.status(404).send("User not found");
        }
        const newConversation = {
            IDsensed: myId,
            IDgetter: user.id,
        };
        await db("conversations").insert(newConversation);
        const conversation: any = await db
            .select('conversations.*')
            .from('conversations')
            .innerJoin('users as u1', 'conversations.IDsensed', 'u1.id')
            .innerJoin('users as u2', 'conversations.IDgetter', 'u2.id')
            .where((builder: any) => {
                builder
                    .where('u1.id', '=', myId)
                    .andWhere('u2.id', '=', user.id)
                    .orWhere('u1.id', '=', user.id)
                    .andWhere('u2.id', '=', myId);
            })
            .first();  
        const messages = await db.select('*')
            .from('messages')
            .where('IdConversation', conversation.id);
        conversation.messages = messages;
        conversation.secondUser = user;
        return res.status(201).send(conversation);
    } catch (err) {
        console.log('error', err);
        return res.status(500).send(`Error when creating the user ${err}`);
    }
});

export default router;