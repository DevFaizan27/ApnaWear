import React from 'react'

const Modal = ({ isOpen, onClose,name, address, pincode, phoneNumber, setName, setAddress, setPincode, setPhoneNumber, buyNow }) => {
  return (
        <div className={`fixed inset-0 flex  justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="fixed bg-white p-8 rounded-lg shadow-lg w-96 h-100vh mt-3 text-gray-800">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-4">Enter Details</h2>
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name} onChange={(e)=>setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-600 font-medium mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address} onChange={(e)=>setAddress(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-600 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="pincode" className="block text-gray-600 font-medium mb-2">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={pincode} onChange={(e)=>setPincode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={()=>{buyNow(); onClose()}}>Pay Now</button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Modal