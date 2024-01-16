export const socket =(io:any)=>{
    io.on('connection', (socket: any) => {
      const id = socket.handshake.query.id
         console.log(`A user connected ${id}`);
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
        socket.on("send_request", (data:any) => {
         socket.broadcast.emit("receive_message", {data});
        })
      });
}