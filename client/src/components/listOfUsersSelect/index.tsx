import { useEffect } from "react";
import React from "react";
//mui//
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
//mui//
interface Props {
  arrayConversations:any ;
  handleSelectChat:(chatSelected:any)=>void ;
}
export const ListOfUsersSelect = ({arrayConversations,handleSelectChat}:Props) => {
  console.log(arrayConversations);
  
  return (
    <List sx={{ width: '100%', maxWidth: 370, bgcolor: 'background.paper' }}>
      {arrayConversations?arrayConversations.map((conversation: any) => (
        <React.Fragment key={conversation.id}>
          <ListItem alignItems="flex-start" onClick={() =>{
            handleSelectChat(conversation)}}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={ <Typography  variant="h5" sx={{color:"green"}}>{conversation.secondUser.name}</Typography> }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="black"
                  >
                     {conversation.messages.length!==0?"......"+conversation.messages[conversation.messages.length-1]?.text.slice(0,15):""}

                  </Typography>
                </React.Fragment>
              }
            />
             {conversation.newmessages>0?<Badge badgeContent={conversation.newmessages} color="primary"  sx={{marginTop:"23px"}}></Badge>:""}
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      )):""}
    </List>
  );
  
}
 export default ListOfUsersSelect





 
  








// const style = {
//     py: 0,
//     width: '100%',
//     maxWidth: 468,
//     borderRadius: 2,
//     border: '1px solid',
//     borderColor: 'divider',
//     backgroundColor: 'background.paper',
//     marginTop:"10px"
//   };
  // import Divider from '@mui/material/Divider';
  // import { List, ListItem, ListItemText } from '@mui/material';
  // import Avatar from '@mui/material/Avatar';
  // import Typography from '@mui/material/Typography';
  // import { DataUser } from '../../pages/homePage'
  // interface Props {
//     handleChat :(key:any)=>void,
//     userSelected:DataUser[],
// }
// export default  function ListOfUsersSelect  ({handleChat,userSelected}:Props) {
// return(
//     <List sx={style}>
//     {
//       userSelected?.map((user,key)=>{
// return(
// <div key={key}> 
//     <ListItem onClick={()=>handleChat(key)}  >
//       <ListItemText sx={{marginLeft:"80px"}} >
//         <Typography variant='h5'>{user.name}</Typography>
//       </ListItemText>
//       <Avatar alt="profile" src="" />
//     </ListItem>
//     <Divider component="li" />
//     </div>
// )
//       })
//     }
//      </List>
// )
// }
