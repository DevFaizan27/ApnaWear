import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm, setSearchResults, setSearchTerm } from '../../Redux/Slices/SearchSlice';
import { Link, useNavigate } from 'react-router-dom';



const Input = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const searchTerm = useSelector(selectSearchTerm);
    const items = useSelector((state) => state.items.items);
    const handleSearchClick = () => {
        // Filter items based on the search term
        dispatch(setSearchResults(items));
        navigate('/user/searchItem')
      };
    const handleInputChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    };
  
    
    return (
        <div className="flex items-center "  >
         
            <input type="text" className=" border text-sm rounded-lg  w-96  p-2.5  border-gray-700 bg-gray-800  placeholder-gray-500 focus:ring-1 text-white " placeholder="Search Your Collection..."
            value={searchTerm}
            onChange={handleInputChange}/>
            <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white rounded-lg border border-gray-300 focus:ring-2 focus:outline-none  bg-gray-900 hover:bg-gray-700 focus:ring-blue-800"
             onClick={handleSearchClick}>
                Search
            </button>
        </div>

    )
}

export default Input