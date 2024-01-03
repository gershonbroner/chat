import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled, { keyframes } from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const SignUp = () => {
  const navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
      })

      const onSubmit = async (data:any) => {
       axios.post('http://localhost:3001/login/addNewUser',{
      name: data.firstName +" "+ data.lastName,
        password: data.password,
       })
       navigate("/")
      }
    return ( 
        <MainDiv>
         <AnimatedDiv>new user</AnimatedDiv>
        <SignUpnDiv onSubmit={handleSubmit(onSubmit)}> 
        <TextField label='first name' variant='filled'  {...register("firstName", {
          required: "Please enter your first name.",
        })}/>
        <TextField label='last name' variant='filled'  {...register("lastName", {
          required: "Please enter your last  name.",
        })}/>
        <TextField label='enter password' variant='filled'  {...register("password", {
          required: "Please enter password.",
        })}/>
        <Button type='submit' variant='contained'>הרשם</Button>
        </SignUpnDiv>
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
    
    const SignUpnDiv = styled.form`
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
    
