import React, { useEffect } from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../User/Loader';
import AdminNavbar from './AdminNavbar';
import { deleteItemById } from '../../Redux/Actions/deleteItemById';
import { toast } from 'react-toastify';

const GetItemAdmin = () => {



  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const status = useSelector((state) => state.items.status);
  const error = useSelector((state) => state.items.error);


  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
 
  const deleteItem = async (id) => {
    try {
      await dispatch(deleteItemById(id));
      toast('Item Deleted Successfully');
      // Reload the window after the item is deleted successfully
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  
 
  return (
   <>
   <AdminNavbar/>
   <div className="bg-gray-800 p-6 border border-gray-400  rounded-lg shadow-md  ">
    <h2 className="text-2xl text-white mb-4">Item Added</h2>
    <div className='overflow-x-scroll md:overflow-y-scroll h-96'style={{
  '--scrollbar-thumb-color': '#4A90E2', 
  '--scrollbar-track-color': '#333',     
}}>
    <table className="w-full  bg-gray-700 text-gray-300 rounded-lg ">
      <thead>
        <tr>
          <th className="px-4 py-2">Item Image</th>
          <th className="px-4 py-2">Item Name</th>
          <th className="px-4 py-2">Item Price</th>
          <th className="px-4 py-2">Item Quantity</th>
          <th className='px-4 py-4'>Delete item</th>
        </tr>
      </thead>
      <tbody>
      {items.map((item) => (
        <tr key={item.id}>
        <td className="px-4 py-2"><img src={item.data.imageUrl} className='w-16 h-16'/></td>
        <td className="px-4 py-2">{item.data.itemName}</td>
        <td className="px-4 py-2">{item.data.itemPrice}</td>
        <td className="px-4 py-2">{item.data.itemQuantity}</td>
        <td className="px-4 py-2 hover:cursor-pointer"
         onClick={()=>{deleteItem(item.id)}}
         >
          <AiFillDelete color='red'/></td>
      </tr>
      ))}
       
      </tbody>
    </table>
    </div>
    
  </div>
   </>
    
  )
}

export default GetItemAdmin




