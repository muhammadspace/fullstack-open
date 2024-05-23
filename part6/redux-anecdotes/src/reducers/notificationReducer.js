import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    visible: false,
    timeoutId: null
}

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialState,
    reducers: {
        setNotificationMessageAC(state, action)
        {
            const { message, timeoutId } = action.payload
            return {
                message,
                visible: true,
                timeoutId
            }
        },
        clearNotificationAC(state, action)
        {
            clearTimeout(state.timeoutId)
            return {
                message: "",
                visible: false,
                timeoutId: null
            }
        }
    }
})

export default notificationSlice.reducer
export const { setNotificationMessageAC, clearNotificationAC } = notificationSlice.actions