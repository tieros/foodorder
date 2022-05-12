import { auth, cart } from './slices';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        auth,
        cart
    },
});
