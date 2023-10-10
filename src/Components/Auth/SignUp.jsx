import React from 'react'
import { GiClothes } from 'react-icons/gi';
import{ useState } from 'react';
import { auth } from '../Admin';
import { storage ,firestore } from '../Admin/index';
import {ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



const Signup = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate()

     
    const handleSignup = async (e) => {
      e.preventDefault();
      setLoading(true)

      try {
        const userCredential=await auth.createUserWithEmailAndPassword(email,password)
        toast.success('Signed Up Succesfully!!! Redirecting to Login')

        const user=userCredential.user;

        const storageRef=storage.ref();
        const imgRef=storageRef.child(`user_images/${name}`)
        await imgRef.put(file)

        const  photoUrl=await  imgRef.getDownloadURL()

        await firestore.collection('users').doc(user.uid).set({
            uid:user.uid,
            userType:'user',
            displayName:name,
            email,
            photoURL:photoUrl,
          
        });

        navigate('/')
        
        console.log(user);
      } catch (error) {
        toast(error)
      }
    };


  return (
    <div className=" text-white font-sans ">
    <div className="h-100% mt-20 flex  justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 border-2 border-gray-100">
            <h1 className="text-2xl font-semibold mb-4 flex">Welcome to ApnaWear<GiClothes/></h1>
           <form onSubmit={handleSignup}>
           <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300">UserName</label>
                    <input type="text" id="name" name="userName" className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Your email" 
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300">Email</label>
                    <input type="email" id="email" name="email" className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Your email" required
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-300">Password</label>
                    <input type="password" id="password" name="password" className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Your password"
                    onChange={(e) => setPassword(e.target.value)}
                     required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-300">User Image</label>
                    <input type="file" id="image" name="userImage" className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Your password"
                    onChange={(e) => setFile( e.target.files[0])}
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-md transition-colors duration-300" >Sign Up</button>
                </form>
                <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/" className="text-blue-500 hover:underline">
         Login
        </Link>
      </p>
        </div>
    </div>
    <ToastContainer/>
</div>
  )
}

export default Signup