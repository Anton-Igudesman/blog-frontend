import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, baseFrontendUrl } from '../../../utilities/baseUrl';

//register action

export const registerUserAction = createAsyncThunk('users/register', 
async (user, { rejectWithValue, getState, dispatch}) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post(`${baseUrl}/api/v1/users/register`, user, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

//login action
export const loginUserAction = createAsyncThunk('users/login',
async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        //http request
        const { data } = await axios.post(`${baseFrontendUrl}/api/v1/users/login`, user, config);
        
        //save user into local storage (has token info)
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
  }
);

//logout action
export const logoutUserAction = createAsyncThunk('/user/logout', 
async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
        localStorage.removeItem('userInfo');
        window.location = `${baseUrl}/login`;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
})


const localUser = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) :
null;

//slice
const userSlices = createSlice({
    name: 'users',
    initialState: {
        userAuth: localUser
    },
    extraReducers: builder => {
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appError = undefined;
            state.serverError = undefined;
        });
        
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appError = undefined;
            state.serverError = undefined;
        });

        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.appError = false;
            state.serverError = false;
        });

        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });

        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.payload?.message;
        });

        //logout
        builder.addCase(logoutUserAction.pending, (state, action) => {
            state.loading = false;
        });

        builder.addCase(logoutUserAction.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });

        builder.addCase(logoutUserAction.rejected, (state, action) => {
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
            state.loading = false;

        })
    }
});

export default userSlices.reducer;



//map notation
// [registerUserAction.pending]: (state, action) => {
//     state.loading = true;
// },
// [registerUserAction.fulfilled]: (state, action) => {
//     state.registered = action?.payload;
// }