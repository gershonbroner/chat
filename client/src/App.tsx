import {  Route, Routes,redirect  } from "react-router-dom";
import {Login} from "./pages/login";
import { SignUp } from "./pages/signup";
import { HomePage } from "./pages/homePage";
import useLocalStorage from "./socket/localStorage";
import SocketProvider from "./socket";
 
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
function App() {
const [id,setId] = useLocalStorage("id")
const [explicitlyDisconnected, setExplicitlyDisconnected] = useState(false);
const navigate = useNavigate();
const handlesetId = (data:any) =>{
 setId(data.id) 
 setTimeout(() => {
  navigate('/homepage')
}, 1000);
  }
  const handleDisconnect = () => {
    setExplicitlyDisconnected(true);
  };

   
  useEffect(() => {
    window.addEventListener('beforeunload', handleDisconnect);
    return () => {
      if(!explicitlyDisconnected){
      localStorage.clear()
      }
      window.removeEventListener('beforeunload', handleDisconnect);
    };
  }, [explicitlyDisconnected]);

  return (
  <>
  {!id ? <Routes>
    <Route path="/" element={<Login funcToSetId= {handlesetId}/>}/>
    <Route path="/signup" element={<SignUp/>}/>
   </Routes>
  :
  <SocketProvider id={id}> 
   <Routes>
   <Route path="/homepage" element={<HomePage/>}/>
   </Routes>
    </SocketProvider>
   }
    </>
  );
}

export default App;
