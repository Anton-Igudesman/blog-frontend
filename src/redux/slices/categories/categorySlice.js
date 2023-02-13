import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../../../utilities/baseUrl';

import axios from 'axios';

export const createCategoryAction = createAsyncThunk('category/create', 
    async (category, {rejectWithValue, getState, dispatch}) => {
        
        //http call
        try {
            
            const userData = JSON.parse(localStorage.getItem('userInfo'));
            const { token } = userData?.data
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const { data } = await axios.post(`${baseUrl}/api/v1/categories`, 
            {
                title: category?.title
            }, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });

    export const fetchCategoryAction = createAsyncThunk('category-list', 
    async (payload, {rejectWithValue, getState, dispatch}) => {
        
        //http call
        try {
            
            const userData = JSON.parse(localStorage.getItem('userInfo'));
            const { token } = userData?.data
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const { data } = await axios.get(`${baseUrl}/api/v1/categories`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });

//slice

const categorySlices = createSlice({
    name: 'category',
    initialState: {},
    extraReducers: builder => {

        //create category
        builder.addCase(createCategoryAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(createCategoryAction.fulfilled, (state, action) => {
            state.category = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });

        builder.addCase(createCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //get category list
        builder.addCase(fetchCategoryAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
            state.categoryList = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });

        builder.addCase(fetchCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        })
    }
});

export default categorySlices.reducer;