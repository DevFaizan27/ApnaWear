import { createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "../../Components/Admin/index";



export const fetchUserByUid=createAsyncThunk('user/getUser',async(uid)=>{
    try {
        const currentUser=await firestore.collection('./users').doc(uid).get();
        if (currentUser.exists){
            return{
                user:currentUser.data()
            }
        }else{
            throw new Error('User not Found');
        }
    } catch (error) {
        throw error;
    }
})