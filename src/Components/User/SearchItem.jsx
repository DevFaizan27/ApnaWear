import React from 'react'
import NavBar from './NavBar'
import { selectSearchResults } from '../../Redux/Slices/SearchSlice';
import ItemCard from './ItemCard'
import { useSelector } from 'react-redux';




const SearchItem = () => {
  const searchResults = useSelector(selectSearchResults);
  return (
    <>
    <NavBar/>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative  bg-gray-800">
  <h1 className="text-3xl sm:text-4xl text-white mb-4">{searchResults.length === 0 ? 'No Item Found - Search Again!!' : 'Searched Item'} </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {searchResults.map((item) => (
        <ItemCard item={item.data}/>
      ))}
  </div>
</div>
    
    </>
  )
}

export default SearchItem