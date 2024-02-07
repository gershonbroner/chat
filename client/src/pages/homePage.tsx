import axios from 'axios';
import styled from 'styled-components';
import Menu from '../components/menu'
import { useCallback, useEffect, useState } from 'react';
import ListOfUsersSelect from '../components/listOfUsersSelect';
import DisplayUserOnChat from '../components/displayUserOnChat';
import { Button } from '@mui/material';
import socket, { useSocket } from '../socket';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { InputMessageAndSend } from '../components/inputMessageAndSend';
import { DisplayChat } from '../components/displayChat';
import useLocalStorage from '../socket/localStorage';
//  export interface DataUser {
//   name:String ,
//  created_at:String ,
//  updated_at:String ,
//  password:String ,
//  id:String ,
// }
  
export const HomePage = () => {
   const socket:any = useSocket()
  const [id,setId] = useLocalStorage("id")
  // const navigate = useNavigate();
  // const [usersSelected,setUsersSelected]= useState<any>([])
  const [currentChat,setCurrentChat] = useState<any>()
 const [conversations,setConversations] = useState<any>([])
  const [conversationsOfList,setConversationsOfList] =useState<any>([])
  // test for token
    // const sendRequest = async() =>{
    //     const cookies = document.cookie;
    //     axios.get('http://localhost:3001/login/getRequest',{
    //         headers: {
    //           authorization: `Bearer ${cookies.slice(6)}`
    //         }
    //       }
    //     ).then((response)=>{
    //      console.log(response.data);
    //     }).catch(({response})=>{
    //         if(response.status === 401){
    //         console.log("token is empty");
    //         }
    //         if(response.status === 403){
    //             console.log("user not found");
    //             }
    //       }
    //       )
    // }
    
// const SetUserSelected = (data:any) =>{
//   setUsersSelected([...usersSelected,data]);
// }
 //  setCurrentUser((prev) => ({...prev,...usersSelected[key] }));
 // socket.on('get_chat_with_user', handleReceiveMessage);
  // socket.off('get_chat_with_user', handleReceiveMessage);
 {/* <Menu SetUserSelected={SetUserSelected}/>  */}
const SetUserSelected = (data:any)=>{
  console.log(data);
  if(data.message === "cencal specipic user"){
    setConversationsOfList(conversations)
  }else if(data.message === "need push new conversation"){
 setConversationsOfList([data.data])
 setConversations([...conversations,data.data])
  }else{
    setConversationsOfList([data.data])
  }
}
const handleSelectChat = (chatSelect:any) => {
  chatSelect.newmessages = 0;
  setCurrentChat(chatSelect) 
}
const handleReceiveMessage = useCallback((data:any)=>{
  const { idConversation,idSender } = data;
  const holdTargetObject = conversations.find((item:any) => item.id === idConversation)
  console.log(holdTargetObject);
  axios.get(`http://localhost:3001/conversations/getAllConversationsOfUser/${id}`).then((res:any)=>{
    setConversationsOfList(res.data)
    setConversations(res.data)
    const targetObject = res.data.find((item:any) => item.id === idConversation);
    if (targetObject) {
      if(idSender!==id && targetObject?.id !== currentChat?.id ){
        if(holdTargetObject.newmessages>0){
          console.log('AI');
          targetObject.newmessages=holdTargetObject.newmessages+1 ;
        }else{
          targetObject.newmessages = 1
        }
      }
     if(targetObject?.id === currentChat?.id){
      setCurrentChat(targetObject);
     }
    }
})},[currentChat,conversations,conversationsOfList])

 useEffect(()=>{
  axios.get(`http://localhost:3001/conversations/getAllConversationsOfUser/${id}`).then((data:any)=>{
setConversations(data.data)
setConversationsOfList(data.data)
  })
 },[id])

   useEffect(():any => {
    socket.on('receive_message',handleReceiveMessage);
    return () => {
      socket.off('receive_message', handleReceiveMessage);
      
    };
  }, [socket,handleReceiveMessage]);
 
  
    return (
    <MainDiv> 
      <SelectUserDive>
      <Menu SetUserSelected={SetUserSelected}  dataOfConversations={conversations}/> 
      <ListOfUsersSelect  arrayConversations = {conversationsOfList} handleSelectChat = {handleSelectChat}/>
      </SelectUserDive>
       <ChatDive>
        
        {currentChat? <DisplayUserOnChat chatSelect={currentChat}/>:""}
        {currentChat?<DisplayChat currentChat={currentChat}/>:""}
         <InputMessageAndSend currentChat={currentChat}/>
       </ChatDive>
    </MainDiv>
    )
}

// style component //
const MainDiv = styled.div`
 width: 100%;
 height: 98vh;
 display: flex;
flex-direction: row ;
` ;

const ChatDive = styled.div`
width : 75% ;
height: 100% ;
display: flex ;
flex-direction:column;
align-items:center;
border: 2px solid white;
margin-bottom: 20px;
background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,233,186,0.700717787114846) 100%);
`; 

const SelectUserDive = styled.div`
width : 25% ;
height: 100% ;
display: flex ;
 flex-direction:column;
border: 2px solid green;
margin-bottom: 20px;
background:rgba(189, 183, 182, 0.5)
`
 