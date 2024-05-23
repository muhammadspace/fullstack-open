import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: "",
    reducers: {
        filterAC(state, action)
        {
            return action.payload
        }
    }
})

export default filterSlice.reducer
export const { filterAC } = filterSlice.actions