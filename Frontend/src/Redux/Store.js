import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Slices/AuthSlice";
import listReducer from "./Slices/List";
import reviewReducer from "./Slices/Review";

const store = configureStore({
    reducer: {
        auth: authReducer,
        list: listReducer,
        review: reviewReducer
    }
})

export default store;