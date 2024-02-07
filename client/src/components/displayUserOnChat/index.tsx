import { Avatar, Typography } from "@mui/material"
import styled from "styled-components"
 
 
interface Props {
   chatSelect: any;
  }
export default function DisplayUserOnChat ({chatSelect}:Props) {  
  
 return(
 <MainDive>
    <Typography variant="h4" color='white' >{chatSelect.secondUser.name}</Typography> 
    <Avatar alt="propile" src="" sx={{marginLeft:"20px"}}/>
 </MainDive>
    )
}
const MainDive = styled.div`
width:100%;
height:70px ;
display: flex;
justify-content: center;
align-items: center;
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(120,181,127,1) 65%, rgba(0,212,255,1) 100%);
`