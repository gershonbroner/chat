import axios from 'axios';

export const HomePage = () => {
    const sendRequest = async() =>{

        const cookies = document.cookie;

        axios.get('http://localhost:3001/login/getRequest',{
            headers: {
              authorization: `Bearer ${cookies.slice(6)}`
            }
          }
        ).then((response)=>{
         console.log(response.data);
        }).catch(({response})=>{
            if(response.status === 401){
            console.log("token is empty");
            }
            if(response.status === 403){
                console.log("user not found");
                }
          }
          )
    }
    return (
        <button onClick={sendRequest}>homepage</button>
    )
}