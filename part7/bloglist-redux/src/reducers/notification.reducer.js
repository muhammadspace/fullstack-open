import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        notifyAC: (state, action) => {
            console.log(action)
            return action.payload
        },
        clearAC: (state, action) => {
            return ""
        }
    }
})

export const { notifyAC, clearAC } = notificationSlice.actions

export default notificationSlice.reducer