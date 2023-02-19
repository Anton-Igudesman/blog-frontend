import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { baseUrl } from '../../../utilities/baseUrl';
import axios from 'axios';

const resetEditAction = createAction("category/reset");
const resetDeleteAction = createAction("category/delete-reset");
const resetCategoryAction = createAction("category/created-reset");

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

            dispatch(resetCategoryAction());

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

    export const updateCategoryAction = createAsyncThunk('category/update', 
    async (selectedCategory, {rejectWithValue, getState, dispatch}) => {
        
        //http call
        try {
            
            const userData = JSON.parse(localStorage.getItem('userInfo'));
            const { token } = userData?.data
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const { data } = await axios.put(`${baseUrl}/api/v1/categories/${selectedCategory?.id}`,
            {title: selectedCategory?.title}, config);
            
            dispatch(resetEditAction());

            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });

    export const deleteCategoryAction = createAsyncThunk('category/delete', 
    async (id, {rejectWithValue, getState, dispatch}) => {
        
        //http call
        try {
            
            const userData = JSON.parse(localStorage.getItem('userInfo'));
            const { token } = userData?.data
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const { data } = await axios.delete(`${baseUrl}/api/v1/categories/${id}`, config);

            dispatch(resetDeleteAction());

            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });

    export const getCategoryDetailAction = createAsyncThunk('category/details', 
    async (id, {rejectWithValue, getState, dispatch}) => {
        
        //http call
        try {
            
            const userData = JSON.parse(localStorage.getItem('userInfo'));
            const { token } = userData?.data
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const { data } = await axios.get(`${baseUrl}/api/v1/categories/${id}`, config);
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

        builder.addCase(resetCategoryAction, (state, action) => {
            state.isCreated = true;
        })

        builder.addCase(createCategoryAction.fulfilled, (state, action) => {
            state.category = action?.payload;
            state.isCreated = false;
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
        });

        //edit category

        builder.addCase(updateCategoryAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(resetEditAction, (state, action) => {
            state.isEdited = true;
        })

        builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
            state.updatedCategory = action?.payload;
            state.isEdited = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });

        builder.addCase(updateCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //delete category

        builder.addCase(deleteCategoryAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(resetDeleteAction, (state, action) => {
            state.isDeleted = true;
        })

        builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
            state.deletedCategory = action?.payload;
            state.isDeleted = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });

        builder.addCase(deleteCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //get category detail

        builder.addCase(getCategoryDetailAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getCategoryDetailAction.fulfilled, (state, action) => {
            state.selectedCategory = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });

        builder.addCase(getCategoryDetailAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    }
});

export default categorySlices.reducer;