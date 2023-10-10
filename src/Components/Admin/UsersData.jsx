import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { firestore } from '.';
import { FiEdit, FiSave } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';

const UsersData = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState('user'); // Default value is 'user'
    const [documentId, setDocumentId] = useState('');

  useEffect(() => {
    // Reference to the "orders" collection in Firestore
    const usersCollection = firestore.collection("users");

    // Fetch data from Firestore
    usersCollection
      .get()
      .then((querySnapshot) => {
        const fetchedUsers = [];
        querySnapshot.forEach((doc) => {
          fetchedUsers.push({
            id:doc.id,
            data:doc.data(),
      });
        });
        // Set the orders array state with the fetched data
        setUsers(fetchedUsers);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);





  const openModal = (docId) => {
    setDocumentId(docId);
    setShowModal(true);
  };

  // Function to update the user type in Firestore
  const updateUserType = async () => {
    // Update the Firestore document with the selected user type
    await firestore.collection('users').doc(documentId).update({
      userType: selectedUserType,
    });
    // Close the modal
    setShowModal(false);
    window.location.reload()
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
          <th className="px-4 py-2">User Image</th>
          <th className="px-4 py-2">User Name</th>
          <th className="px-4 py-2">User Email</th>
          <th className="px-4 py-2">User Type</th>
          <th className="px-4 py-2">Edit User Type</th>
        </tr>
      </thead>
      <tbody>
      {users.map((user) => (
        <tr  key={user.id}>
        <td className="px-4 py-2"><img src={user.data.photoURL}  className='w-16 h-16'/></td>
        <td className="px-4 py-2">{user.data.displayName}</td>
        <td className="px-4 py-2">{user.data.email}</td>
        <td className="px-4 py-2">{user.data.userType}</td>
        <td className="px-4 py-2"><button  onClick={() => openModal(user.id)}><FiEdit/></button></td>
        </tr>
       ))}
          </tbody>
    </table>
    </div>
      
    <div>
      {showModal && (
        <div className="small-div-container relative">
  <div className="modal small-modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div className="modal-content">
      <h2 className="text-lg font-semibold">Edit User Type</h2>
      <form className="mt-2">
        <label htmlFor="userType" className="block text-sm font-medium">User Type:</label>
        <select
          id="userType"
          value={selectedUserType}
          onChange={(e) => setSelectedUserType(e.target.value)}
          className="w-full border rounded px-2 py-1 mt-1"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </form>
      <div className="flex justify-center mt-3">
        <button
          onClick={updateUserType}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
        >
          Save
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>

      
      )}
    </div>
      
      

       
   
    
  </div>
  
    </>
  )
}

export default UsersData