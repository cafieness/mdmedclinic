import { createSlice } from "@reduxjs/toolkit";


const orders = createSlice({
    name: "orders_md_clinic",
    initialState: {orders: []},
    reducers: {
        add: (state, action) => {
            state.orders = [action.payload, ...state.orders]
        }
    }
})


  export const {add} = orders.actions
export default orders.reducer