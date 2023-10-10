// services/firestoreService.js
import { firestore } from "../../Components/Admin"; // Import your Firestore configuration

export const getUserDetails = async (uid) => {
  try {
    if (!uid) {
      throw new Error('UID is empty or undefined');
    }
    const userDoc = await firestore.collection('/users').doc(uid).get();
    return userDoc.data();   
  } catch (error) {
    throw error;
  }
};
