import styled from 'styled-components';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useSocket } from '../../socket';
import useLocalStorage from '../../socket/localStorage';
import AttachFileIcon from '@mui/icons-material/AttachFile';
interface Props{
    currentChat:any;
}
export const InputMessageAndSend = ({currentChat}:Props) => {
    const [base64String, setBase64String] = useState('');
const socket:any = useSocket()
 
const [inputValue, setInputValue] = useState("");
const [id] = useLocalStorage("id")

 const handleChange = (event:any) => {
      setInputValue(event.target.value);
}; 
const sendMessage = () => { 
    socket.emit('send_message',{idConversation:currentChat.id,IdSender:id,
    text:inputValue,whoToSend:currentChat.secondUser.id,typemessage:"message"});
 setInputValue("")
}

 
  const handleFileChangez = (event:any) => {
    const file = event.target.files[0];
    const reader:any = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      setBase64String(base64)
    };
    reader.readAsDataURL(file);
  };

  const sendImgToServer = () => {
    if (!base64String) return;
    socket.emit('send_message',{idConversation:currentChat.id,IdSender:id,
     text:base64String,whoToSend:currentChat.secondUser.id,typemessage:"img"});
  }

return(
<MainDive>
<label htmlFor="fileInput">
<AttachFileIcon sx={{marginTop:"15px"}} />
</label>
 <input id="fileInput" type="file" onChange={handleFileChangez} style={{ display: 'none' }} /> 
 
<TextField  variant="filled" color="success" focused  sx={{ width:"100%" }}  onChange={handleChange} value={inputValue}/>
<Button  onClick={sendMessage}><SendIcon/></Button> 
 
   <button onClick={sendImgToServer}>send Image</button> 
</MainDive>
)
}

const MainDive = styled.div`
    display: flex;
    flex-direction:row;
    margin-Top: auto;
    width: 95%;
    margin-left:25px;
    `