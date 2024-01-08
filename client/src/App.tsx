import { BrowserRouter,Route, Routes } from "react-router-dom";
import {Login} from "./pages/login";
import { SignUp } from "./pages/signup";
import { HomePage } from "./pages/homePage";
function App() {
  return (
    <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/homepage" element={<HomePage/>}/>
   </Routes>
    </BrowserRouter>
  );
}

export default App;
