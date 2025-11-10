import { configureStore } from "@reduxjs/toolkit";
import authslice from "../redux/authslice"
const store=configureStore({
    reducer:{
        auth:authslice
    }
})

export default store