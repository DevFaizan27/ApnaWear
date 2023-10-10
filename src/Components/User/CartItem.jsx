import React from 'react'
import { useDispatch } from 'react-redux'
import { decreamentItemQuantity, incrementItemQuantity, removeItem } from '../../Redux/Slices/cartSlice'
import { AiFillDelete } from 'react-icons/ai'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { toast } from 'react-toastify'
import CartEmpty from './CartEmpty'

const CartItem = ({cart}) => {
  const dispatch=useDispatch()

  

  const deleteCartItem=(index)=>{
    dispatch(removeItem(index))
    toast.success('Cart Item Deleted SuccessFully!!')
  }
  return (
    <>
    
    {cart.length === 0 ? (
        <CartEmpty />
      ) : (
        cart.map((data) => (
          <div className="bg-gray-800 w-full rounded-lg shadow-md p-4 my-4 flex items-center" key={data.index}>
            <div className="flex-shrink-0 mr-4">
              <img
                src={data.imageUrl}
                alt="Product Image"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold text-white">{data.itemName}</h2>
                <button className="text-red-500 hover:text-red-700" onClick={() => deleteCartItem(data.index)}>
                  <AiFillDelete color="red" />
                </button>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <button
                    className="text-gray-400 hover:text-gray-300"
                    onClick={() => dispatch(decreamentItemQuantity(data.index))}
                    disabled={data.cartQuantity === 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="mx-2 text-white">{data.cartQuantity}</span>
                  <button
                    className="text-gray-400 hover:text-gray-300"
                    onClick={() => dispatch(incrementItemQuantity(data.index))}
                  >
                    <FiPlus />
                  </button>
                </div>
                <span className="text-lg font-semibold text-white">₹ {data.itemPrice}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  )
}

export default CartItem