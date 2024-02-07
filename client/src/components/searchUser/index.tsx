import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { IconButton } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import useLocalStorage from "../../socket/localStorage";

interface Props {
 dataOfConversations:any,
handleSetUserSelected: ({}:any)=>void
}
export default function  SearchUser ({handleSetUserSelected, dataOfConversations}:Props) {
    const [userSearch, setUserSearch] = useState('');
    const [id] = useLocalStorage("id")
    const handleInputChange = (event:any) => {
         setUserSearch(event.target.value);
    }
   
    const findUser = () => {
        for (let i = 0; i < dataOfConversations.length; i++) {
            const conversation = dataOfConversations[i];
            if (conversation.secondUser && conversation.secondUser.name === userSearch) {
                handleSetUserSelected({data:conversation,message:"found conversation"})
                break; 
            }
            if(i === dataOfConversations.length-1){
                axios.post('http://localhost:3001/conversations/findUserAndAddConversation',{
                    myId:id ,
                    userSearch:userSearch
                        }).then((res):any=>{
                            console.log(res.data);
                            handleSetUserSelected({data:res.data,message:"need push new conversation"})
                        })
            }
        }
    }
    const handleCancelSpecipicUser = () => {
        setUserSearch("")
        handleSetUserSelected({data:{},message:"cencal specipic user"})
    }
    
return (
<MainDivStyle>
    <BoxSearch  onChange={handleInputChange} value={userSearch}></BoxSearch>
    <ClearOutlinedIcon onClick={handleCancelSpecipicUser} sx={{background:"white",borderBottomRightRadius: "5px",height:"22px",marginTop:"10px",
borderTopRightRadius: "5px"
}}/>
    <IconButton type="submit" aria-label="search" onClick={findUser}><SearchIcon sx={{marginTop:"12px"}}/></IconButton>
</MainDivStyle>
)
};

const BoxSearch = styled.input`
display:flex;
justify-content:left;
width: 370px;
height: 20px;
background:white;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
border-bottom-right-radius: 0;
 border-top-right-radius: 0;
margin-top:9px;
border: none;
 outline: none;
`

const MainDivStyle = styled.div`
    width: 100%;
    display: flex;
    justify-content:  flex-start;
    align-items:center;
    margin-left:8px
`;