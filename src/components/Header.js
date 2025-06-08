import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import {HiOutlinePencilAlt} from 'react-icons/hi';
import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from '../Contexts';

const Header = () => {

  const {currentUser, logout} = useContext(AuthContext)
  return (
    <div  className='bg-secondary relative'>
        <div className='p-1 '>
        <h1 className='text-text text-left md:text-center pl-2 text-xl md:text-3xl font-semibold'><Link to='/'>Precious' Chronicles</Link></h1>
        </div>
        <div className=' absolute top-2 right-1 md:right-5'>
            {currentUser? 
            (
            <div className='flex gap-x-1'>
                <span> Hi, {currentUser.username}</span>
                <Link to='/write'><HiOutlinePencilAlt size={25}/></Link>
                <IoIosLogOut size={25} className='cursor-pointer' onClick={logout}/>
            </div>
            ):
            (
              <></>
            )
          }

          
          
        </div>
    </div>
  )
}

export default Header