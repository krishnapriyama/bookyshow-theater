import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

//components
import Sidebar from '../../Components/Sidebar/sidebar'
import Navbar from '../../Components/Navabar/navbar'

const sidebar = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(false)
  useEffect(() => {
    const theaterToken = localStorage.getItem('theaterToken')
    setToken(theaterToken)
    if (!theaterToken) {
      navigate('/login')
    }
  }, [token])
  
  return (
    <>
      <div className=" bg-blueGray-100 h-screen w-full">
        <div className="h-screen bg-blueGray-100">
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            <Navbar />
            {token && <Outlet />}
          </div>
        </div>
      </div>
    </>
  )
}

export default sidebar
