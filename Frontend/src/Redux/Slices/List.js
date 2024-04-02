import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../../Helpers/AxioxInstance";
import toast from 'react-hot-toast';

const initialState = {
    lists: [],
    list: {}
}

export const createList = createAsyncThunk("create/list", async (data) => {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("image", data.image);
        formData.append("location", data.location);
        formData.append("price", data.price);
        formData.append("country", data.country);
        formData.append("category", data.category);
        const res = axiosInstance.post("/listing/create/list", formData);
        toast.promise(res, {
            loading: "Wait",
            success: (data) => {
                return data?.data?.message;
            },
            error: "error"
        });
        return (await res).data;
    } catch (error) {
        console.log("err  : ->", error);
        console.log("Error ", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
    }
})

export const getLists = createAsyncThunk("get/lists", async () => {
    try {
        const res = axiosInstance.get("/listing/get");
        toast.promise(res, {
            loading: "Wait",
            success: (data) => {
                return data?.data?.message;
            },
            error: "error"
        });
        return (await res).data;
    } catch (error) {
        console.log("Error ", error);
        toast.error(error?.response?.data?.message);
    }
})

export const getListById = createAsyncThunk("list/id", async (id) => {
    try {
        const res = axiosInstance.get(`/listing/list/${id}`);
        toast.promise(res, {
            loading: "Wait",
            success: (data) => {
                return data?.data?.message;
            },
            error: "error"
        });
        return (await res).data;
    } catch (error) {
        console.log("Error ", error);
        toast.error(error?.response?.data?.message);
    }
})

export const deleteList = createAsyncThunk("list/delete", async (id) => {
    try {
        // console.log("IS", id);
        const res = axiosInstance.delete(`/listing/delete/list/${id}`);
        toast.promise(res, {
            loading: "Wait",
            success: (data) => {
                return data?.data?.message;
            },
            error: "error"
        });
        return (await res).data;
    } catch (error) {
        console.log("Error ", error);
        toast.error(error?.response?.data?.message);
    }
});

export const editList = createAsyncThunk("edit/list", async (data) => {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("image", data.image);
        formData.append("location", data.location);
        formData.append("price", data.price);
        formData.append("country", data.country);
        const res = axiosInstance.put(`/listing/edit/list/${data.id}`, formData);
        toast.promise(res, {
            loading: "Wait",
            success: (data) => {
                return data?.data?.message;
            },
            error: "error"
        });
        return (await res).data;
    } catch (error) {
        console.log("Error ", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
    }
})

const lists = createSlice({
    name: "list",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLists.fulfilled, (state, actions) => {
            if (actions?.payload?.data) {
                state.lists = actions?.payload?.data;
            }
        }).addCase(getListById.fulfilled, (state, actions) => {
            if (actions?.payload?.data) {
                state.list = actions?.payload?.data;
            }
        })
    }
})

export default lists.reducer;