import { combineReducers } from 'redux';
import itemSlice from '../Slices/itemSlice';
import authSlice from '../Slices/authSlice'
import cartSlice from '../Slices/cartSlice';
import SearchSlice from '../Slices/SearchSlice';





const rootReducer = combineReducers({
  items: itemSlice,
  auth:authSlice,
 cart:cartSlice,
 search:SearchSlice,
});

export default rootReducer;