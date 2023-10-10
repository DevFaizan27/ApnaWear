import React from 'react'

const CartEmpty = () => {
  return (
    <div className="h-92 bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="text-4xl font-semibold mb-4"> Cart Empty</div>
      <p className="text-lg">Your shopping cart is currently empty.</p>
    </div>
  )
}

export default CartEmpty