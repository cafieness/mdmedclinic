import { createSlice } from "@reduxjs/toolkit";


const product = createSlice({
    name: "product_md_clinic",
    initialState: { product: null},
    reducers: {
        order: (state, action) => {
            state.product = action.payload.product
            localStorage.setItem(`product`, JSON.stringify(state.product))
            
        }
    }
    
})

export const {order} = product.actions

export default product.reducer