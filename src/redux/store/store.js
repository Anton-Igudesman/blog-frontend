import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/userSlice';
import categoryReducer from '../slices/categories/categorySlice';
const store = configureStore({
    reducer: {
        users: usersReducer,
        category:categoryReducer
    }
});

export default store;