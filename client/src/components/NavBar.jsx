import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NavBar = () => {
  const{logout}=useAuth();
  return (
    <div className='flex justify-end bg-[#bed1fa] h-[3rem]'>
        <ul className='flex flex-row list-none mr-6 gap-[2rem] items-center font-semibold'>
            <Link to=""><li>Home</li></Link>
            <Link to="/add-books"><li>Add Book</li></Link>
            <Link to="/books"><li>Books</li></Link>
            <Link to=""><li>Contact Us</li></Link>
            <li onClick={()=>logout()}>Logout</li>
        </ul>
    </div>
  )
}

export default NavBar