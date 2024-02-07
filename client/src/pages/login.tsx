import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface Props {
  funcToSetId: (data:any)=>any   ;
}
export  const Login =({funcToSetId}:Props)=> {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
      })
      const onSubmit = async (data:any) => {
        axios.post('http://localhost:3001/login/authenticationANDtoken',
        {
        userName: data.Name,
        password: data.password,
       },{withCredentials:true}
       ).then((res)=>{
      
   funcToSetId(res.data.dataUser)
        }).catch(({response})=>{
          if(response.status === 404){
          console.log("user not found");
          }
        }
        )
      }
    return ( 
    <MainDiv>
     <AnimatedDiv>wellcome</AnimatedDiv>
    <LoginDiv onSubmit={handleSubmit(onSubmit)}> 
    <TextField label='enter your name' variant='filled' {...register("Name", {
          required: "Please enter your  name.",
        })}  />
    <TextField label='enter password' variant='filled'  {...register("password", {
          required: "Please enter your password.",
        })}  />
    <Button type='submit' variant='contained'>התחברות</Button>
    <Button variant='text' onClick={()=> navigate("/signup")}>לא רשום? לחץ כאן</Button>
    </LoginDiv>
    </MainDiv>
    )
}

const exampleAnimation = keyframes`
 from {background-color: #d1542e;}
  to {background-color: #9f72b1;}
`;
const AnimatedDiv = styled.div`
width: 500px;
height: 70px;
color: green;
display: flex;
font-size: 60px;
align-items: center;
justify-content: center;
border-radius: 15px ;
margin-bottom: 30px;
background-color: red;
animation: ${exampleAnimation} 4s infinite; /* infinite for continuous animation */
`;

const MainDiv = styled.div`
 width: 100%;
 height: 100vh;
 display: flex;
 align-items: center;
justify-content: center;
flex-direction: column ;
background: Azure ;
` ;

const LoginDiv = styled.form`
width: 350px;
 height: 500px;
 background: pink;
 display: flex ;
 align-items: center ;
 justify-content: space-evenly;
 flex-direction: column ;
 border: solid pink;
 border-radius: 10px ; 
`
