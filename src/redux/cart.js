import { createSlice } from "@reduxjs/toolkit";


const cart = createSlice({
    name: "cart_md_clinic",
    initialState: {cart: [], orderStatus:-1},
    reducers: {
        add: (state, action) => {
           const index = state.cart.findIndex(el => el.product.id === action.payload.product.id)
           if (index == -1){
               state.cart = [action.payload, ...state.cart]
           } else {
               state.cart[index].units = action.payload.units
           }
            
        },
        remove: (state, action) => {
            state.cart = state.cart.filter(el => el.product.id !== action.payload.id)
        },
        updateUnits: (state, action)=>{
            const index = state.cart.findIndex(el=>el.product.id===action.payload.id)
            state.cart[index].units = action.payload.units;
        },
        increment: (state, action)=>{
            const index = state.cart.findIndex(el=>el.product.id===action.payload.id)
            state.cart[index].units++;
        },
        decrement: (state, action)=>{
            const index = state.cart.findIndex(el=>el.product.id===action.payload.id)
            state.cart[index].units--;
        },
        changeOrderStatus: (state, action)=>{
            state.orderStatus= action.payload.status;
        }
    }
})


  export const {add,remove, updateUnits, increment, decrement, changeOrderStatus} = cart.actions
export default cart.reducer