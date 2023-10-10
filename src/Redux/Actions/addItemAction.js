// src/actions/itemActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { firestore, storage } from '../../Components/Admin/index';

// Define a function to get the next item index
async function getNextItemIndex() {
  const indexRef = firestore.collection('indexes').doc('itemIndex');

  // Use a Firestore transaction to atomically increment the index
  return firestore.runTransaction(async (transaction) => {
    const doc = await transaction.get(indexRef);

    if (!doc.exists) {
      // If the document doesn't exist, initialize the index to 1
      transaction.set(indexRef, { index: 0 });
      return 0;
    }

    // Increment the index and update it in Firestore
    const newIndex = doc.data().index + 1;
    transaction.update(indexRef, { index: newIndex });

    return newIndex;
  });
}

export const addNewItem = createAsyncThunk('items/addNewItem', async (itemData) => {
  try {
    const { itemImage, itemName, itemPrice, itemQuantity } = itemData;

    // Upload item image to Firebase Storage
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`item_images/${itemImage.name}`);
    await imageRef.put(itemImage);

    // Get the download URL for the uploaded image
    const imageUrl = await imageRef.getDownloadURL();

    // Get the next item index
    const newIndex = await getNextItemIndex();

    // Add item data to Firestore with the new index
    const itemsRef = firestore.collection('items');
    const newItem = {
      itemName,
      itemPrice,
      itemQuantity,
      imageUrl,
      cartQuantity: 1,
      index: newIndex, // Add the auto-incremented index
    };

    await itemsRef.add(newItem);

    return newItem;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
});
