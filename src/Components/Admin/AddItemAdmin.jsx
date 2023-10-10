import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewItem } from '../../Redux/Actions/addItemAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from './AdminNavbar';


const AddItemAdmin = () => {
    const dispatch = useDispatch();

    const [itemData, setItemData] = useState({
      itemImage: null,
      itemName: '',
      itemPrice: 0,
      itemQuantity: 0,
      cartQuantity:0,
    });
  
    const handleSubmit =async (e) => {
      e.preventDefault();
  
     // Dispatch the addNewItem action with the item data 

     await dispatch(addNewItem(itemData));
     toast("Item added Succesfull!!")
  
      // Clear the form or redirect as needed
      // Reset itemData state
      setItemData({
        itemImage: null,
        itemName: '',
        itemPrice: 0,
        itemQuantity: 0,
        cartQuantity:1,
      });

    };
  
    
  return (
    <>
    <AdminNavbar/>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-400">
    <h2 className="text-2xl text-white mb-4">Add an Item</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="itemName" className="block text-white text-sm mb-2">
          Item Name
        </label>
        <input
          type="text"
          id="itemName"
          className="w-full p-2 bg-gray-700 text-white rounded"
          value={itemData.itemName} 
          onChange={(e) => setItemData({ ...itemData, itemName: e.target.value }) }
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="itemPrice" className="block text-white text-sm mb-2">
          Item Price
        </label>
        <input
          type="number"
          id="itemPrice"
          className="w-full p-2 bg-gray-700 text-white rounded"
          value={itemData.itemPrice}
           onChange={(e) => setItemData({ ...itemData, itemPrice: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="itemNumber" className="block text-white text-sm mb-2">
          Item Quantity
        </label>
        <input
          type="number"
          id="itemNumber"
          className="w-full p-2 bg-gray-700 text-white rounded"
          value={itemData.itemQuantity}
           onChange={(e) => setItemData({ ...itemData, itemQuantity: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="file" className="block text-white text-sm mb-2">
          Upload Image
        </label>
        <input
          type="file"
          id="file"
          accept="image/*"
          className="w-full bg-gray-700 text-white rounded"
          onChange={(e) => setItemData({ ...itemData, itemImage: e.target.files[0] })}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
      >
        Add Item
      </button>
    </form>
  </div>
</>
  )
}

export default AddItemAdmin