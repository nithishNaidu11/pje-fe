import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'config/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer
    }
});
export default store;
