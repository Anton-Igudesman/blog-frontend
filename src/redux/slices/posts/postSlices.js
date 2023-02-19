import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utilities/baseUrl';


const resetPostAction = createAction('post/reset');

export const createPostAction = createAsyncThunk('post/created', 
async (post, { rejectWithValue, getState, dispatch }) => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
        const { token } = userData?.data
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const formData = new FormData();
            formData.append('title', post?.title);
            formData.append('description', post?.description);
            formData.append('category', post?.category);
            formData.append('image', post?.image);
        
            const { data } = await axios.post(`${baseUrl}/api/v1/posts`, formData, config);
            
            
            dispatch(resetPostAction())
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
});

export const fetchAllPostsAction = createAsyncThunk('post/list', 
async (post, { rejectWithValue, getState, dispatch }) => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    const { token } = userData?.data
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };  
        try {
        
            const { data } = await axios.get(`${baseUrl}/api/v1/posts`, config);
            return data;
        
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
});

//slices
const postSlice = createSlice({
    name: 'post',
    initialState: {},
    extraReducers: builder => {
        builder.addCase(createPostAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(resetPostAction, (state, action) => {
            state.isCreated = true;
        })

        builder.addCase(createPostAction.fulfilled, (state, action) => {
            state.postCreated = action?.payload;
            state.isCreated = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });

        builder.addCase(createPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        builder.addCase(fetchAllPostsAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchAllPostsAction.fulfilled, (state, action) => {
            state.postList = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });

        builder.addCase(fetchAllPostsAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    }
});

export default postSlice.reducer;
