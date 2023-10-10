import { configureStore} from '@reduxjs/toolkit';
import rootReducer from './Reducer/rootReducer';
import { fetchItems } from './Actions/fetchItemAction';







export const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(fetchItems());






