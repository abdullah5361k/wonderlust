import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axioxInstance from "../../Helpers/AxioxInstance";
import toast from 'react-hot-toast';

const initialState = {
    reviews: []
}

export const createReview = createAsyncThunk("create/reviews", async (data) => {
    try {
        console.log("Data", data);
        const res = axioxInstance.post(`reviews/listing/${data.id}`, { review: data.review, rating: data.rating });
        toast.promise(res, {
            loading: "Wait!",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Add your review"
        })
        return (await res).data;
    } catch (error) {
        console.log("Error ", error);
        toast.error(error?.response?.data?.message);
    }
});

export const deleteReview = createAsyncThunk("delete/review", async (id) => {
    try {
        const res = axioxInstance.delete(`/reviews/delete/${id}`);
        toast.promise(res, {
            loading: "Wait!",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Deleted successfully"
        });
        return (await res).data;
    } catch (error) {
        console.log("Error ", error);
        toast.error(error?.response?.data?.message);
    }
});


const review = createSlice({
    name: "review",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createReview.fulfilled, (state, action) => {
            console.log(action?.payload?.data);
            if (action?.payload?.data) {
                state.reviews.push(action.payload.data);
            }
        })
    }
})

export default review.reducer;