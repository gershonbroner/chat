import {  Route, Routes } from "react-router-dom";
import {Login} from "./pages/login";
import { SignUp } from "./pages/signup";
import { HomePage } from "./pages/homePage";
import { useEffect, useState } from "react";
import useLocalStorage from "./socket/localStorage";
import SocketProvider from "./socket";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
function App() {
  
  const [id,setId] = useLocalStorage("id")
  const navigate = useNavigate();
const handlesetId = (data:any) =>{
  
 setId(data.id) 
 setTimeout(() => {
  navigate('/homepage')
}, 1000);
  }
  
  return (
  <>
  {!id ? <Routes><Route path="/" element={<Login funcToSetId= {handlesetId}/>}/> </Routes>
  :
  <SocketProvider id={id}> 
   <Routes>
   <Route path="/homepage" element={<HomePage/>}/>
    <Route path="/signup" element={<SignUp/>}/>
   </Routes>
    </SocketProvider>
   }
    </>
  );
}

export default App;
