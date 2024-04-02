import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../../Helpers/AxioxInstance";
import toast from 'react-hot-toast';
let data;
const storedData = localStorage.getItem('data');
if (storedData !== undefined && storedData !== null) {
    try {
        data = JSON.parse(storedData);
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
} else {
    data = {};
}


const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : false,
    data: data
}

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
    try {
        console.log('Auth Data', data);
        const res = axiosInstance.post("/auth/register", data);
        toast.promise(res, {
            loading: "Wait creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        })
        return (await res).data;
    } catch (error) {
        console.log("Error ", error);
        toast.error(error?.response?.data?.message);
    }

});


export const loginAccount = createAsyncThunk("auth/login", async (data) => {
    try {
        const res = axiosInstance.post("/auth/login", data);
        toast.promise(res, {
            loading: "Wait",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Login"
        });
        return (await res).data;
    } catch (error) {
        console.log("Error ", error);
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        deleteInfo: (state, action) => {
            state.isLoggedIn = false;
            state.data = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createAccount.fulfilled, (state, action) => {
            console.log(action?.payload?.data);
            if (action?.payload?.success) {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("data", JSON.stringify(action?.payload?.data));
                state.isLoggedIn = true;
                state.data = action?.payload?.data;
            }
        }).addCase(loginAccount.fulfilled, (state, action) => {
            console.log("Action ", action);
            if (action?.payload?.success) {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("data", JSON.stringify(action?.payload?.data));
                state.isLoggedIn = true;
                state.data = action?.payload?.data;
            }
        })
    }
})

export const { deleteInfo } = authSlice.actions;
export default authSlice.reducer;
