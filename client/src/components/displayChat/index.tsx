import { useEffect, useState } from "react"
import  { useSocket } from "../../socket";
import useLocalStorage from "../../socket/localStorage";

interface Props{
    idOfUser:String|undefined;
}
export const DisplayChat = ({idOfUser}:Props) => {

const socket:any = useSocket()
const [myID,setIdUser] = useLocalStorage("dataUser")
const [arrayOfText,setArratOfText] = useState<any>([{}])


const handleReceiveMessage = (data: any) => {
setArratOfText([...data]);
  };

  useEffect(():any => {
    socket.on('receive_message', handleReceiveMessage);
    socket.on('get_chat_with_user', handleReceiveMessage);
    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('get_chat_with_user', handleReceiveMessage);
    };
  }, [socket]);
  
  useEffect(()=>{
    socket.emit("get_chat_with_user",{idOfUser,myID})
  },[idOfUser])
    return (
<div style={{display:"flex",flexDirection:"column"}}> 
        {  
     arrayOfText.map((data: any,key:number)=>{
        if(data.id1 === myID){
            return(
                <div key={key} style={{background:"grey",marginRight:"330px",marginTop:"10px"}}>
               {data.text}
             </div>
              ) }else{
                return(
                    <div key={key} style={{background:"green",marginLeft:"330px",marginTop:"10px"}}>
                   {data.text}
                 </div>
                  ) 
              }
    })}
      </div>
    )
}