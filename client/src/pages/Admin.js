import React, { useEffect, useState, useContext } from 'react'
import { decodeToken } from 'react-jwt'
import Header from '../components/Header/Header'
import { useNavigate } from 'react-router-dom'
import { EditContext } from '../EditContext'
function Admin() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const { userData, setUserData } = useContext(EditContext)
  const authtoken = localStorage.getItem('adminToken')
  const displayAdmin = async () => {
    const response = await fetch('http://localhost:3002/api/admin', {
      headers: {
        authtoken
      },
    })
    const userData = await response.json()

    setData(userData)
  }
  const remove = async (id, event) => {
    event.preventDefault()
    if(authtoken){
      const response = await fetch(`http://localhost:3002/api/delete`, {
        headers: {
          'Content-Type': 'application/json',
          authtoken
        },
        body: JSON.stringify({
          id,
        }),
        method: 'POST',
      })
  
      if (response.status) {
        alert('successfull')
      } else {
        alert('user not found')
      }
    }else{
      navigate('/admin-login')
    }
  
  }

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')

    if (adminToken) {
      const admin = decodeToken(adminToken)

      if (!admin) {
        localStorage.removeItem('adminToken')
        navigate('/admin-login', { replace: true })
      } else {
        displayAdmin()
      }
    } else {
      navigate('/admin-login', { replace: true })
    }
  }, [remove])

  const addUser = async (event) => {
    event.preventDefault()
    navigate('/add-user')
  }
  return (
    <div>
      <Header />
      <div className="container">
        <button className="btn btn-success text-end my-3" onClick={addUser}>
          Add User
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Operation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setUserData(val)
                        navigate('/edit-user')
                      }}
                    >
                      Edit
                    </button>{' '}
                    <button
                      className="btn btn-danger"
                      onClick={(event) => remove(val._id, event)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
