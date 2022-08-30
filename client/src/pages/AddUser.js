import React, { useState, useEffect } from 'react'
import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom'

function AddUser() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const addUser = async (event) => {
    event.preventDefault()
    const authtoken = localStorage.getItem('adminToken')
    if (authtoken) {
      const response = await fetch('http://localhost:3002/api/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken,
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      const data = await response.json()
      console.log(data, '--------------')
      if (data.status === 'ok') {
        navigate('/admin')
      }
    } else {
      navigate('/admin-login')
    }
  }
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    if (adminToken) {
      const admin = decodeToken(adminToken)
      if (!admin) {
        navigate('/admin-login')
      }
    }
  }, [])

  return (
    <section className="login">
      <div className=" p-5 d-flex justify-content-center align-items-center ">
        <form onSubmit={addUser} className="p-3  d-flex flex-column  ">
          <h1 className="text-center"> Add User </h1>
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

          <input
            className="login-input my-3 rounded-pill border-0 p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Passsword"
          />
          <button
            className="my-2  btn btn-primary "
            type="submit"
            value="Register"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}

export default AddUser
