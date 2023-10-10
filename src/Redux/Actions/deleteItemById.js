import { firestore } from "../../Components/Admin";
import { deleteItem } from "../Slices/itemSlice";

export const deleteItemById = (itemId) => async (dispatch) => {
    try {
      // Replace 'yourFirestoreCollection' with the actual name of your Firestore collection
      const itemsRef = firestore.collection('/items');
  
      // Delete the item from Firestore based on itemId
      await itemsRef.doc(itemId).delete();
  
      // Dispatch the deleteItem action with the itemId
      dispatch(deleteItem(itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };