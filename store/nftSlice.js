import { createSlice } from '@reduxjs/toolkit'

export const nftSlice = createSlice({
    name: "nft",
    initialState: {},
    reducers: {
        storeAttributes: (state, action) => {

        }
    }
});

export const { storeAttributes } = nftSlice.actions

export default nftSlice;
