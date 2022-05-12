import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items : [],
    totalAmount : 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){
            const updatedTotalAmount =
                state.totalAmount + action.payload.item.price * action.payload.item.amount;

            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id,
            );
            const existingCartItem = state.items[existingCartItemIndex];
            let updatedItems;

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.payload.item.amount,
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        },
        removeItem(state, action){
            const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            const existingItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingItem.price;
            let updatedItems;
            if (existingItem.amount === 1) {
                updatedItems = state.items.filter((item) => item.id !== action.payload.id);
            } else {
                const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        },
        clearCart(state){
            return initialState
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;