import Divider from '@mui/material/Divider';
import { List, ListItem, ListItemText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { DataUser } from '../../pages/homePage'
interface Props {
    handleChat :(key:any)=>void,
    userSelected:DataUser[],
}
export default  function ListOfUsersSelect  ({handleChat,userSelected}:Props) {
return(
    <List sx={style}>
    {
      userSelected?.map((user,key)=>{
return(
<div key={key}> 
    <ListItem onClick={()=>handleChat(key)}  >
      <ListItemText sx={{marginLeft:"80px"}} >
        <Typography variant='h5'>{user.name}</Typography>
      </ListItemText>
      <Avatar alt="profile" src="" />
    </ListItem>
    <Divider component="li" />
    </div>
)
      })
    }
     </List>
)
}

const style = {
    py: 0,
    width: '100%',
    maxWidth: 468,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    marginTop:"10px"
  };