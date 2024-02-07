import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import SearchUser from '../searchUser/index'
import styled from 'styled-components';
import { useState } from 'react';

interface Props {
  dataOfConversations:any[],
  SetUserSelected: (data:any)=>void
  }

export default function Menu({SetUserSelected,dataOfConversations}:Props) {
const [changeBoxSearch,setBoxSearch] = useState(false)

const handleSetUserSelected = (data:any) => {
  console.log(data);
  
  SetUserSelected(data)
}
const boxSearch = () =>{
 setBoxSearch(!changeBoxSearch)
}
  return (
    <MainDive>
     {
       !changeBoxSearch? <IconButton type="button" sx={{color:'white'}}aria-label="search" onClick={boxSearch}><SearchIcon/></IconButton>
       :<SearchUser handleSetUserSelected ={handleSetUserSelected} dataOfConversations={dataOfConversations}/>
       }
    </MainDive>
  );
}
const MainDive = styled.div`
width:100%;
display: flex;
align-items: center;
height: 100px;
margin-bottom: 15px;
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,145,17,1) 65%, rgba(0,212,255,1) 100%);
`
 
