import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import { useSelector } from 'react-redux';
import Loader from './Loader';
import NotFound from './NotFound';


const Items = () => {
  const[item,setItem]=useState([])
  const items = useSelector((state) => state.items.items);

  useEffect(()=>{
    setItem(items)
  })

    const status = useSelector((state) => state.items.status);
    const error = useSelector((state) => state.items.error);
  
    if (status === 'loading') {
      return <Loader/>
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>
    }

    if(item.length===0){
      return <NotFound/> 
    }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative top-80 bg-gray-800">
  <h1 className="text-3xl sm:text-4xl text-white mb-4">Featured Items</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {item.map((item) => (
      <ItemCard key={item.id} id={item.id} item={item.data} />
    ))}
  </div>
</div>
    </>

  )
}

export default Items