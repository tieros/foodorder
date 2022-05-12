import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userInfo : '',
    errorMessage: '',
    hasError: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action){
            state.isLoggedIn = action.payload
        },
        setUserInfo(state, action){
            state.userInfo = action.payload
        },
        setErrorMessage(state, action){
            state.errorMessage = action.payload
        },
        setHasError(state, action){
            state.hasError = action.payload
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;