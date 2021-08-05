import { createSlice } from "@reduxjs/toolkit";


const user = createSlice({
    name: "user_md_clinic",
    initialState: {token: "", user: null},
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
            localStorage.setItem("token", state.token)
            localStorage.setItem("user", JSON.stringify(state.user))
        },
        logout: (state, action) => {
            state.user = null
            state.token = ""
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        } 
    }
})

export const {login, logout} = user.actions

export default user.reducer