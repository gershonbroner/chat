import axios from 'axios';
import styled from 'styled-components';
import Menu from '../components/menu'
import { useEffect, useState } from 'react';
import ListOfUsersSelect from '../components/listOfUsersSelect';
import DisplayUserOnChat from '../components/displayUserOnChat';
import { Button } from '@mui/material';
import { useSocket } from '../socket';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { InputMessageAndSend } from '../components/inputMessageAndSend';
import { DisplayChat } from '../components/displayChat';
 export interface DataUser {
  name:String ,
 created_at:String ,
 updated_at:String ,
 password:String ,
 id:String ,
}
  
export const HomePage = () => {
  const navigate = useNavigate();
  const [usersSelected,setUsersSelected]= useState<DataUser[]>([])
  const [currentUser,setCurrentUser] = useState<DataUser>()
 
  
  // test for token
    const sendRequest = async() =>{
        const cookies = document.cookie;
        axios.get('http://localhost:3001/login/getRequest',{
            headers: {
              authorization: `Bearer ${cookies.slice(6)}`
            }
          }
        ).then((response)=>{
         console.log(response.data);
        }).catch(({response})=>{
            if(response.status === 401){
            console.log("token is empty");
            }
            if(response.status === 403){
                console.log("user not found");
                }
          }
          )
    }
const SetUserSelected = (data:any) =>{
  setUsersSelected([...usersSelected,data]);
}
const handleChat = (key:any) => {
   setCurrentUser((prev) => ({...prev,...usersSelected[key] }));
   console.log(currentUser);
   

   
}
 
 
    return (
    <MainDiv> 
      <SelectUserDive>
      <Menu SetUserSelected={SetUserSelected}/> 
      <ListOfUsersSelect handleChat={handleChat} userSelected={usersSelected}/>
      </SelectUserDive>

   {/* //chat */}

       <ChatDive>
        {
          currentUser? <DisplayUserOnChat user={currentUser}/>
          : ""
        }
      <DisplayChat idOfUser={currentUser?.id}/>
      <InputMessageAndSend id={currentUser?.id}/>
       </ChatDive>
    </MainDiv>
    )
}
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
 