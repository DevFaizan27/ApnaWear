import React, { useEffect, useState } from 'react';
import { GiClothes, GiRamProfile } from 'react-icons/gi';
import { FiHome, FiSearch } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../../Redux/Slices/authSlice';
import {ToastContainer, toast } from 'react-toastify';
import { getTotal } from '../../Redux/Slices/cartSlice';



const NavBar = () => {
  const [showInput, setShowInput] = useState(false); // Add this state variable
  const dispatch=useDispatch()

  const handleInputToggle = () => {
    setShowInput(!showInput);
  };
  const navigate=useNavigate()

  const handleLogout=async()=>{
    toast.success('Logged Out Succesfully!!  Redirecting To login')
    dispatch(clearUser());
    localStorage.removeItem('userUid');
    localStorage.removeItem('userType');
    localStorage.removeItem('userProfile');
    navigate('/')
  }

  const profileData = JSON.parse(localStorage.getItem('userProfile'));

  const handleHome=()=>{
    navigate('/user')
  }


  //cart item functionality

  const {cart,totalQuantity}=useSelector((state)=>state.cart)
  useEffect(()=>{
    dispatch(getTotal())
  },[cart])

  return (
    <nav className="bg-gray-800 border-gray-200 px-4 lg:px-6 py-2.5   border-b-4">
      <div className="flex flex-wrap  justify-around items-center mx-auto max-w-screen-xl">
        <Link to="/user" className="flex items-center">
          <GiClothes color="white"/>
          <span className="self-center text-xl font-semibold whitespace-nowrap ml-1 text-white">ApnaWear</span>
        </Link>
        <div className="flex items-center lg:order-1 ml-6">
        <button onClick={handleHome} className='p-2 text-white focus:outline-none focus:ring-2  font-medium rounded-lg text-sm  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700'><FiHome color='white'/></button>
          <button href="#" className=" text-white focus:ring-4  font-medium rounded-lg text-sm  px-3  lg:px-2 py-2 lg:py-2.5  mr-1 hover:bg-gray-700 focus:outline-none focus:ring-gray-800" onClick={handleLogout}>Log Out</button>
          <Link
      to={'/user/cart'}
      className="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-primary-800 relative"
    >
      <span className='flex text-center justify-center text-xl font-extrabold'>
        <AiOutlineShoppingCart />
      </span>
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {totalQuantity}
        </span>
      )}
    </Link>
          <Link to={'/user/userProfile'} className="p-2 text-white focus:outline-none focus:ring-2  font-medium rounded-lg text-sm  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700"><span className='flex text-center justify-center text-xl  font-extrabold'><img
            src={profileData.photoURL}
            alt="User Profile"
            className="w-8 h-8 rounded-full mr-2"
          /></span></Link>
          <button onClick={handleInputToggle} className='block lg:hidden sm:hidden m-o p-0'>{showInput?<RxCross1 color='white'/>:<FiSearch  color='white'/>}</button>
        </div>
        <div className="hidden lg:block md:block">
          <Input />
        </div>
        <div className='lg-hidden md:hidden w-80'>
        {showInput && <Input />}
        </div>
      </div>
      <ToastContainer/>
    </nav>
  );
};

export default NavBar;