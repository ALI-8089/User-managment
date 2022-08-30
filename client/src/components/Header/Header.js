import React from 'react'
import {useNavigate} from "react-router-dom"
function Header() {
 const navigate = useNavigate() 
  const Logout =()=>{
localStorage.removeItem('adminToken')
navigate('/admin-login')
  }
  return (
    <div><nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <h5 className="navbar-brand">Admin</h5>
    <button className='btn btn-secondary text-end' onClick={Logout}>Logout</button>
  </div>
</nav></div>
  )
}

export default Header