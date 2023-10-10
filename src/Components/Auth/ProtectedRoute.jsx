import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../Redux/Actions/userDetailsAction';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ role ,children }) => {
  const navigate = useNavigate();
  const[user,setUser]=useState(null);





  useEffect(()=>{
    const fetchData = async () => {
           try {


            const userType = localStorage.getItem('userType');


             if (userType === role) {
              // Redirect to an unauthorized page or a login page
              setUser(userType)
            }
            if (userType !== role) {
              // Redirect to an unauthorized page or a login page
              navigate('/unauthorized');
            }
            if (!userType ) {
              // Redirect to an unauthorized page or a login page
              navigate('/');
            }
            
           } catch (error) {
             console.error('Error fetching user details:', error);
             // Handle the error, e.g., redirect to an error pag
           }
         };
         fetchData()

  },[user])



  if (user === role) {
    return children
  } else {
    return null; // You can also return a message or component here
  }
};

export default ProtectedRoute;


