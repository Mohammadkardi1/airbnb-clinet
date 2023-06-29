import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from '../../api/API'

export const getAllBookings = createAsyncThunk('booking/getAllBookings', () => {
    return api.getAllBookings().then((response) => response.data)
})

export const addBooking = createAsyncThunk('booking/addBooking', (booking) => {
    return api.addBooking(booking).then((response) => response.data)
})

export const getUserBookings = createAsyncThunk('booking/getUserBookings', () => {
    return api.getUserBookings().then((response) => response.data)
})
