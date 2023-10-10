import React from 'react'

const EmptyOrder = () => {
  return (
    <div className="h-100vh bg-gray-900 text-white flex flex-col items-center justify-center">
    <div className="text-4xl font-semibold mb-4">No Order Yet</div>
    <p className="text-lg">Your Order page is currently empty.</p>
  </div>
  )
}

export default EmptyOrder