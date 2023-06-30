import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";

export const nftSlice = createSlice({
    name: "nft",
    initialState: {
        value: {}
    },
    reducers: {
        nftAttributes: (state, action) => {
            state.value = action.payload;
        },
        clearNft: state => {
            state.value = {};
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.nft,
            };
        },
    },
});

export const { nftAttributes, clearNft } = nftSlice.actions

export default nftSlice.reducer;
