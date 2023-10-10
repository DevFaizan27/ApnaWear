import React, { useState } from 'react';
import { GiClothes } from 'react-icons/gi';
import { useDispatch} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { signInWithEmailAndPassword } from '../../Redux/Actions/authAction';
import {  setUser } from '../../Redux/Slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../Redux/Actions/userDetailsAction';


const Login = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const navigate=useNavigate()


  const handleLogin = async () => {
    try {
      // Sign in the user with Firebase authentication
      
      const user = await signInWithEmailAndPassword(email, password);
      toast.success('Logged in Successfully!! Welcome')
      const userDetails = await getUserDetails(user.uid);
     
      const userProfile=JSON.stringify(userDetails)
      
      localStorage.setItem('userUid', user.uid);
      localStorage.setItem('userType',userDetails.userType)
      localStorage.setItem('userProfile',userProfile)
      

      dispatch(setUser(user.uid));
      navigate(`/${userDetails.userType}`)

    } catch (error) {
    toast.error('Login error');
    }
  };
  
  
  return (
    <div className="text-white font-sans ">
       <ToastContainer/>
  <div className=" h-5/6 flex  mt-20  justify-center">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 border-2 border-gray-100">
      <h1 className="text-2xl font-semibold mb-4 flex">Welcome to ApnaWear<GiClothes/></h1>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-300">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-300">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-md transition-colors duration-300"
        onClick={handleLogin}
      >
        Log In
      </button>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          SignUp
        </Link>
      </p>
    </div>
  </div>
 
</div>
  )
}

export default Login