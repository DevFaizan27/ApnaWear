import React from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const profileData = JSON.parse(localStorage.getItem('userProfile'));

  const handleViewOrders = () => {
    navigate('/user/vieworders');
  };

  const handleViewDeliveredOrders = () => {
    navigate('/user/viewDeliveredOrders');
  };

  return (
    <>
      <NavBar />
      <div className="text-white flex flex-col items-center h-screen mt-20">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg md:w-1/2 mx-auto">
          <h1 className="text-4xl font-bold text-center text-white bg-primary p-4 rounded-t-lg">
            My Profile
            <div className="border-b-2 border-white w-1/4 mx-auto mt-2"></div>
          </h1>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                src={profileData.photoURL}
                alt="#"
                className="w-32 h-32 rounded-full border-4 border-primary dark:border-secondary transform hover:scale-110 transition duration-300 ease-in-out"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold mb-2">{profileData.displayName}</h2>
              <p className="text-lg text-gray-300 mb-2">{profileData.email}</p>
            </div>
          </div>

          {/* Button to view user's orders */}
          <button
            className="mt-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg w-full md:w-auto transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={handleViewOrders}
          >
            View Pending Orders
          </button>
          <button
            className="mt-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg w-full md:w-auto transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={handleViewDeliveredOrders}
          >
            View Delivered Orders
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
