import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemToCart } from '../../Redux/Slices/cartSlice'
import { toast ,ToastContainer} from 'react-toastify'

const ItemCard = ({id,item}) => {

const dispatch=useDispatch()

const cart =useSelector((state)=>state.cart)

const handleAddToCart=()=>{
  dispatch(addItemToCart(item))
  toast.success('Added to Cart')
}
 
  
  return (
    <>
<div className="w-full md:max-w-md lg:max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700 transition-transform transform hover:scale-105">
  <Link to={`/user/itemdetails/${id}`}>
    <img className="w-full h-auto md:h-56 rounded-t-lg" src={item.imageUrl} alt="product image" />
  </Link>
  <div className="p-4">
    <div className="flex items-center justify-between">
      <h5 className="text-xl font-semibold tracking-tight text-gray-400">{item.itemName}</h5>
      <span className="text-gray-300">In Stock-{item.itemQuantity}</span>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-between mt-2">
      <span className="text-xl font-bold text-gray-300 md:mr-4">₹ {item.itemPrice}</span>
      <button  className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 mt-2 md:mt-0"
         onClick={handleAddToCart} >
        Add to Cart
      </button>
    </div>
  </div>
</div>

    </>
  )
}

export default ItemCard