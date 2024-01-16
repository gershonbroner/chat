import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { IconButton } from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface Props {
handleSetUserSelected: (data:any)=>void
}
export default function  SearchUser ({handleSetUserSelected}:Props) {
    const [userSearch, setUserSearch] = useState('');
    const handleInputChange = (event:any) => {
         setUserSearch(event.target.value);
    }
    const findUser = () => {
        axios.get('http://localhost:3001/users/getuserSearch',{
            params:{
                userName: userSearch
                  }
        }).then((res)=>{
            handleSetUserSelected(res.data)
        })
         }
return (
<>
    <BoxSearch  onChange={handleInputChange}/>
    <IconButton type="submit" aria-label="search" onClick={findUser}><SearchIcon sx={{marginTop:"12px"}}/></IconButton>
</>
)
};

const BoxSearch = styled.input`
display:flex;
justify-content:left;
width: 360px;
height: 20px;
background:white;
border-radius: 5px;
margin-left:40px;
margin-top:9px;
border: none;
 outline: none;
`