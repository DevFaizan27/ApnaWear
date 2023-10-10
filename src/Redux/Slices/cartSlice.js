import { createSlice } from "@reduxjs/toolkit";



const loadCartDataFromLocalStorage = () => {
    try {
      const cartData = localStorage.getItem("cartData");
      if (cartData) {
        return JSON.parse(cartData);
      }
    } catch (error) {
      console.error("Error loading cart data from local storage:", error);
    }
    return {
      cart: [],
      totalQuantity: 0,
      totalPrice: 0,
    };
  };
  
  const initialState = loadCartDataFromLocalStorage();


const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cart.find((item) => item.index === newItem.index);
      
            if (existingItem) {
              // If the item is already in the cart, increment its quantity by one
              existingItem.cartQuantity += 1;
            } else {
              // If the item is not in the cart, add it with a quantity of one
              state.cart.push({ ...newItem, cartQuantity: 1 });
            }
            localStorage.setItem("cartData", JSON.stringify(state));
          },
       getTotal:(state)=>{
        let {totalPrice,totalQuantity}=state.cart.reduce(
            (cartTotal,cartItem)=>{
                const{itemPrice,cartQuantity}=cartItem
                const itemTotal=itemPrice*cartQuantity;
                cartTotal.totalPrice+=itemTotal
                cartTotal.totalQuantity+=cartQuantity
            return cartTotal         
           },{
            totalPrice:0,
            totalQuantity:0
           }
        )
        state.totalPrice=parseInt(totalPrice.toFixed(2));
        state.totalQuantity=totalQuantity
       },
       removeItem:(state,action)=>{
        state.cart=state.cart.filter((item)=>item.index!==action.payload)
        localStorage.setItem("cartData", JSON.stringify(state));

       },
       incrementItemQuantity:(state,action)=>{
        state.cart=state.cart.map((item)=>{
            if(item.index===action.payload){
                return {...item,cartQuantity:item.cartQuantity+1}
            }
            return item
        })
        localStorage.setItem("cartData", JSON.stringify(state));

       },
       decreamentItemQuantity:(state,action)=>{
        state.cart=state.cart.map((item)=>{
            if(item.index===action.payload){
                return {...item,cartQuantity:item.cartQuantity-1}
            }
            return item
        })
        localStorage.setItem("cartData", JSON.stringify(state));

       }
       
    }
})

export const { addItemToCart,getTotal,removeItem ,incrementItemQuantity,decreamentItemQuantity} = cartSlice.actions;


export default cartSlice.reducer;