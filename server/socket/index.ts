import db from "../db/db";

export const socket =(io:any)=>{

    io.on('connection', (socket: any) => {
      const id = socket.handshake.query.id
      socket.join(id);
       console.log(`A user connected ${id}`);

        socket.on('disconnect', () => {
          console.log('User disconnected');
        });

        socket.on("send_message",async (data:any) => {
        console.log(data);
        
          await db('messages') .insert(data)
         await db('messages')
          .select('*')
          .where('id1', data.id1)
          .andWhere('id2', data.id2)
          .orWhere('id1', data.id2)
          .andWhere('id2', data.id1)
          .then((result:any) => {
            socket.emit("receive_message", result);
            socket.to(data.id2).emit("receive_message", result);
          })
          .catch((error:any) => {
            console.error(error);
          })
        })
       
      socket.on("get_chat_with_user",async (data:any) => {
         await db('messages')
          .select('*')
          .where('id1', data.idOfUser)
          .andWhere('id2', data.myID)
          .orWhere('id1', data.myID)
          .andWhere('id2', data.idOfUser)
          .then((result:any) => {
            socket.emit("receive_message", result);
          })
          .catch((error:any) => {
            console.error(error);
          })
        })
})
}