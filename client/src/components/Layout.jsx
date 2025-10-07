import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './navBar'

const Layout = () => {
  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}

export default Layout