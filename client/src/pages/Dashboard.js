import React,{ useEffect ,useState} from 'react'
import {  decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate()
  const logout=()=>{
    localStorage.removeItem('token') 
    navigate('/login')
  }

    async function populateQuote(){
      const req =  await fetch('http://localhost:3002/api/',{
        headers:{
            'x-access-token':localStorage.getItem('token')
        }
      })
      const data = req.json()
      console.log(data);
     
    }
    useEffect(()=>{
       
    const token = localStorage.getItem('token')
    if(token){
        const user = decodeToken(token)
        console.log(user);
        if(!user){
            localStorage.removeItem('token')
        
            navigate('/login', { replace: true });
        }else{
            populateQuote()
        }
    }else{
      navigate('/login', { replace: true });
    }
    },[])
  return (
    <div className="login p-2">
      <button onClick={logout}className="btn btn-secondary ">Loogut</button>
      <h1 className='text-center  text-white display-1'> WELCOME HOME</h1>
      
    </div>
  )
}

export default Dashboard