import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Edit from './components/Edituser/Edit'
import EditUser from './EditContext'
import AddUser from './pages/AddUser'
import Admin from './pages/Admin'

import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <EditUser>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Dashboard />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/edit-user" element={<Edit />} />
            <Route path="/add-user" element={<AddUser />} />

          </Routes>
        </EditUser>
      </BrowserRouter>
    </div>
  )
}

export default App
