import React from 'react'
import Feed from './Components/User/Feed'
import Login from './Components/Auth/Login'
import AdminDashboard from './Components/Admin/AdminDashboard'
import ProtectedRoute from './Components/Auth/ProtectedRoute'
import Unautherisezed from './Components/User/Unautherisezed'
import ItemDetail from './Components/User/ItemDetail'
import { Route,Routes } from 'react-router-dom'
import Signup from './Components/Auth/SignUp'
import Cart from './Components/User/Cart'
import UserProfile from './Components/User/UserProfile'
import GetItemAdmin from './Components/Admin/GetItemAdmin'
import AddItemAdmin from './Components/Admin/AddItemAdmin'
import ShowOrder from './Components/Admin/ShowOrder'
import SearchItem from './Components/User/SearchItem'
import UserOrder from './Components/User/UserOrder'
import Delivered from './Components/Admin/Delivered'
import DeliveredOrder from './Components/User/DeliveredOrder'



const App = () => {

  return (
  
<>


<Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/unauthorized" element={<Unautherisezed/>}/>
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/addItem"
        element={
          <ProtectedRoute role="admin">
            <AddItemAdmin/>

          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/showItem"
        element={
          <ProtectedRoute role="admin">
            <GetItemAdmin/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/showOrders"
        element={
          <ProtectedRoute role="admin">
            <ShowOrder/>
          </ProtectedRoute>
        }
      />
      <Route
        path='/admin/deliveredItems'
        element={
          <ProtectedRoute role="admin">
            <Delivered/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute role='user'>
            <Feed/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/itemdetails/:id"
        element={
          <ProtectedRoute role='user'>
            <ItemDetail/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/searchItem"
        element={
          <ProtectedRoute role='user'>
            <SearchItem/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/userProfile"
        element={
          <ProtectedRoute role='user'>
            <UserProfile/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/vieworders"
        element={
          <ProtectedRoute role='user'>
            <UserOrder/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/viewDeliveredorders"
        element={
          <ProtectedRoute role='user'>
            <DeliveredOrder/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/cart"
        element={
          <ProtectedRoute role='user'>
            <Cart/>
          </ProtectedRoute>
        }
      />
    </Routes>
</>
       

   
    )
}

export default App











{/* <>
    
    <Routes>
    <Route path='/' element={<AdminDashboard/>}/>
    <Route path='/itemdetails/:id' element={<ItemDetail/>}/>
    </Routes>
</> */}