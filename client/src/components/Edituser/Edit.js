import React, { useState, useEffect, useContext } from 'react'
import './Edit.css'
import { EditContext } from '../../EditContext'
import {useNavigate} from "react-router-dom"
function Edit() {
    const navigate = useNavigate()
  const { userData, setUserData } = useContext(EditContext)
  const [email, setEmail] = useState(userData.email)
  const [name, setName] = useState(userData.name)

  async function editUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:3002/api/edit-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authtoken: localStorage.getItem('adminToken')
      },
      body: JSON.stringify({
        id:userData._id,
        name,
        email,
      }),
    })
    const data = await response.json()
    console.log("dfsdddddddddddd",data);
    if (data.status) {
      localStorage.setItem('token', data.user)
      alert('Edit successful ')
      navigate('/admin')
    } else {
      alert('Please check your username and password')
    }
  }



  return (
    <section className="login">
      <div className=" p-5 ">
        <h1 className="text-center">Edit User</h1>
        <div className="  d-flex justify-content-center align-items-center ">
          <form onSubmit={editUser} className="p-3  d-flex flex-column  ">
            <input
              className="login-input my-3 rounded-pill border-0 p-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <input
              className="login-input my-3 rounded-pill border-0 p-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />

            <button className="my-2  btn btn-primary " type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Edit
