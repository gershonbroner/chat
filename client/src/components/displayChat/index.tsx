import { useEffect, useRef, useState } from "react";
import useLocalStorage from "../../socket/localStorage";
import { Typography } from "@mui/material";
import axios from "axios";

interface Props{
  currentChat:any;
}
export const DisplayChat = ({currentChat}:Props) => { 
  const [selectedFile, setSelectedFile] = useState(null);
  const messageContainerRef = useRef<any>(null);
   const [myId] = useLocalStorage("id")
   useEffect(() => {
    scrollToBottom();
  }, [currentChat]);
  useEffect(() => {
    scrollToBottom();
  }, []);

  // Function to scroll to the bottom of the message container
  const scrollToBottom = () => {
    
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
   
  };
   

  const handleFileChange = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData:any = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://localhost:3001/messages/upload', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const [imageUrls, setImageUrls] = useState([]);

    const getImg = () => {
    axios.get("http://localhost:3001/messages/imageUrls")
      .then((res) => {
        console.log(res.data);
        
        setImageUrls(res.data);
      })
      .catch((error) => {
        console.error('Error fetching image URLs:', error);
      });
  };
  console.log(currentChat);
return(
  <> 
  <div  ref={messageContainerRef} style={{overflowY:"auto",scrollbarWidth:"none"}}>
  { currentChat?currentChat.messages.map((message:any,key:any)=>(
     message.typemessage.trim() === "message"?
     ( 
      
      message.IdSender === myId? 
        <div key={key}style={styleMessageOfMe}>{message.text}</div>
        :
        <div key={key} style={styleMessageOfSecond}>{message.text}</div>
     
     ):(
      message.IdSender === myId? 
        <div key={key}style={styleMessageOfMe}>
           <img src={`data:image/jpeg;base64,${message.text}`}  style={{ maxWidth: '100%', height: 'auto' }}  alt="Base64 Encoded" />
           </div>
        :
        <div key={key} style={styleMessageOfSecond}>
           <img src={`data:image/jpeg;base64,${message.text}`}  style={{ maxWidth: '100%', height: 'auto' }}  alt="Base64 Encoded" />
           </div>
      
     )

)):""
}
</div>
   </>
)
}





const styleMessageOfMe:any = {background:"LightSlateGray",marginRight:"330px",borderRadius:"5px",width:"150px",
height:"auto",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"15px" ,wordBreak: " break-word"}

const styleMessageOfSecond:any = {background:"LimeGreen",marginLeft:"330px",borderRadius:"5px",width:"150px",height:"auto",justifyContent:"center",
display:"flex",alignItems:"center",marginTop:"15px",wordBreak: " break-word"}

// const socket:any = useSocket()
// const [myID,setIdUser] = useLocalStorage("dataUser")
// const [arrayOfText,setArratOfText] = useState<any>([{}])

// const handleReceiveMessage = (data: any) => {
// setArratOfText([...data]);
//   };

//   useEffect(():any => {
//     socket.on('receive_message', handleReceiveMessage);
//     socket.on('get_chat_with_user', handleReceiveMessage);
//     return () => {
//       socket.off('receive_message', handleReceiveMessage);
//       socket.off('get_chat_with_user', handleReceiveMessage);
//     };
//   }, [socket]);
  
  // useEffect(()=>{
  //   if(currentChat === undefined)return;
  //   socket.emit("get_chat_with_user",{idOfUser,myID})
  // },[idOfUser])
//     return (
// <div style={{display:"flex",flexDirection:"column"}}> 
//         {  
//      arrayOfText.map((data: any,key:number)=>{
//         if(data.id1 === myID){
//             return(
//                 <div key={key} style={{background:"grey",marginRight:"330px",marginTop:"10px"}}>
//                {data.text}
//              </div>
//               ) }else{
//                 return(
//                     <div key={key} style={{background:"green",marginLeft:"330px",marginTop:"10px"}}>
//                    {data.text}
//                  </div>
//                   ) 
//               }
//     })}
//       </div>
//     )
// }