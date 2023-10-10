import React, { useState } from 'react';
import { GiClothes } from 'react-icons/gi';
import { RxCross1 } from 'react-icons/rx';
import { FiHome, FiMenu } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../Redux/Slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';

const AdminNavbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const showAddedItem = () => {
    navigate('/admin/showItem');
  };

  const handleAddItem = () => {
    navigate('/admin/addItem');
  };

  const showOrderDetails = () => {
    navigate('/admin/showOrders');
  };

  const deliveredItems = () => {
    navigate('/admin/deliveredItems');
  };

  const handleLogout = async () => {
    dispatch(clearUser());
    navigate('/');
    localStorage.removeItem('userUid');
    localStorage.removeItem('userType');
    toast('Logged Out Successfully');
  };

  const handleHome = () => {
    navigate('/admin');
  };

  return (
    <nav className="bg-gray-800 border-gray-200 px-4 lg:px-6 py-2">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="" className="flex items-center">
          <GiClothes color="white" />
          <span className="self-center text-xl font-semibold whitespace-nowrap ml-1 text-white">
            ApnaWear<span className=" p-10">Admin panel</span>
          </span>
        </a>
        <button onClick={handleToggle} className="block lg:hidden sm:hidden m-o p-0">
          {toggle ? <RxCross1 color="white" /> : <FiMenu color="white" />}
        </button>
        <div className="hidden lg:block md:block">
          <div className="flex items-center lg:order-2 ml-6">
            <button onClick={handleHome} className="p-2 text-white focus:outline-none focus:ring-2  font-medium rounded-lg text-sm  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700">
              <FiHome color="white" />
            </button>
            <button className="p-2 text-white focus:outline-none focus:ring-2  font-medium rounded-lg text-sm  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700" onClick={showAddedItem}>
              Show Added Item
            </button>
            <button className="p-2 text-white focus:outline-none focus:ring-2  font-medium rounded-lg text-sm  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700" onClick={handleAddItem}>
              Add item
            </button>
            <button className="p-2 text-white focus:outline-none focus:ring-2  font-medium rounded-lg text-sm  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700" onClick={showOrderDetails}>
              Show Orders
            </button>
            <button className="p-2 text-white focus:outline-none focus:ring-2  font-medium rounded-lg text-sm  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700" onClick={deliveredItems}>
              Delivered Orders
            </button>
            <button className=" text-white focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
        <div className="lg:hidden md:hidden w-80">
          {toggle && (
            <div className="flex flex-col items-center lg:order-2 ml-6">
              <button onClick={handleHome}>
                <FiHome color="white" />
              </button>
              <button className="p-2 text-white focus:outline-none focus:ring-4  font-medium rounded-lg text-sm  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700" onClick={showAddedItem}>
                Show Added Item
              </button>
              <button className="p-2 text-white focus:outline-none focus:ring-4  font-medium rounded-lg text-sm  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700" onClick={handleAddItem}>
                Add item
              </button>
              <button className="p-2 text-white focus:outline-none focus:ring-2  font-medium rounded-lg text-sm  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700" onClick={showOrderDetails}>
                Show Orders
              </button>
              <button className="p-2 text-white focus:outline-none focus:ring-2  font-medium rounded-lg text-sm  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700" onClick={deliveredItems}>
                Delivered Orders
              </button>
              <button className=" text-white focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default AdminNavbar;
