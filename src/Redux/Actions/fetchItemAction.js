import { createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../../Components/Admin/index';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    try {
      const snapshot = await firestore.collection('/items').get();
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      return items
    } catch (error) {
      throw error;
    }
  });
  
  
  
  export const fetchItemById = createAsyncThunk('items/fetchItemById', async (itemId) => {
    try {
      const currentItem = await firestore.collection('/items').doc(itemId).get();
      if (currentItem.exists) {
        return {
          id: currentItem.id,
          data: currentItem.data(),
        };
      } else {
        throw new Error('Item not found');
      }
    } catch (error) {
      throw error;
    }
  });