import styled from 'styled-components';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useSocket } from '../../socket';

interface Props{
    id:String|undefined;
}
export const InputMessageAndSend = ({id}:Props) => {

const socket:any = useSocket()
 
const [inputValue, setInputValue] = useState("");


 const handleChange = (event:any) => {
      setInputValue(event.target.value);
}; 
const sendMessage = () => { 
    const jsonValue:any = localStorage.getItem("chat-clone-dataUser");
    const  IDsender =JSON.parse(jsonValue) 
    socket.emit('send_message',{id1:IDsender,id2:id,text:inputValue});
 setInputValue("")
}

return(
<MainDive>
<TextField  variant="filled" color="success" focused  sx={{ width:"100%" }}  onChange={handleChange} value={inputValue}/>
<Button  onClick={sendMessage}><SendIcon/></Button>  
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