import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchItemById } from '../../Redux/Actions/fetchItemAction';
import Loader from './Loader';
import NavBar from './NavBar';
import { addItemToCart } from '../../Redux/Slices/cartSlice';
import NotFound from './NotFound';





const ItemDetail = () => {


  const itemId=useParams()


  const cart =useSelector((state)=>state.cart)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItemById(itemId.id));
  }, [itemId.id]);

  // Fetch the item when the component mounts or when itemId changes


  // Access the item data from the Redux store
  const item = useSelector((state) => state.items.currentItem);
  const status = useSelector((state) => state.items.status);
  const error = useSelector((state) => state.items.error);

 

  // Render based on the status and data
  if (status === 'loading') {
    return <Loader/>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if(!item){
    return <NotFound/>
  }




 

  return (
    <>
    <NavBar/>
    <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center mt-10">
      {/* Responsive Heading */}
      <h1 className="text-xl md:text-3xl font-semibold mb-6  font-serif">
      Hurray  Just a Step ahead to add this at your collection......
      </h1>
      <div className="w-full md:w-3/5 h-45v md:h-60v overflow-hidden flex flex-col md:flex-row">
        {/* Left section - Image */}
        <div className="w-full md:w-2/5">
          <img
            src={item.data.imageUrl}
            alt="Item"
            className="w-full h-full object-cover transition-transform transform hover:scale-105"
            loading="lazy"
          />
        </div>
        {/* Right section - Item details */}
        <div className="w-full md:w-3/5 bg-gray-800 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-4">{item.data.itemName}</h1>
            <div className="text-2xl font-semibold mb-4">₹ {item.data.itemPrice}</div>
            <div className="text-lg">In stock - {item.data.itemQuantity}</div>
            
          </div>
         
        </div>
      </div>
    </div>
    </>
  )
}

export default ItemDetail