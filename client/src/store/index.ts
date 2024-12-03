import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser (state, action) {
            state.user = action.payload
            state.token = action.payload
        },
        logout (state) {
            state.user = null;
            state.token = null;
        },
    }
})

// eslint-disable-next-line no-empty-pattern
export const { setUser, logout } = authSlice.actions
export default authSlice.reducer