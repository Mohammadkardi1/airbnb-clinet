import { createSlice } from "@reduxjs/toolkit"
import { addBooking,
        getAllBookings,
        getUserBookings } from "../actions/BookingActions"


const initialState = {
    bookings: [],
    userBookings: [],
    loading: false,
    bookingError: ''
}


const bookingSlice = createSlice({
    name: 'booking', 
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getAllBookings.pending, (state) => {
            state.loading = true
            state.bookingError = ''
        })
        builder.addCase(getAllBookings.fulfilled, (state, action) => {
            state.loading = false
            state.bookings = action?.payload.data
            state.bookingError = ''
        })
        builder.addCase(getAllBookings.rejected, (state, action) => {
            state.loading = false
            state.bookings = []
            state.bookingError = action.error.message
        })



        builder.addCase(addBooking.pending, (state) => {
            state.loading = true
            state.bookingError = ''
        })
        builder.addCase(addBooking.fulfilled, (state, action) => {
            state.loading = false
            console.log('action.payload.data', action.payload.data)
            state.bookings.push(action.payload.data)
            console.log('state.bookings', state.bookings)
            state.bookingError = ''
        })
        builder.addCase(addBooking.rejected, (state, action) => {
            state.loading = false
            state.bookingError = action.error.message
        })







        builder.addCase(getUserBookings.pending, (state) => {
            state.loading = true
            state.bookingError = ''
        })
        builder.addCase(getUserBookings.fulfilled, (state, action) => {
            state.loading = false
            state.userBookings = action?.payload.data
            state.bookingError = ''
        })
        builder.addCase(getUserBookings.rejected, (state, action) => {
            state.loading = false
            state.userBookings = []
            state.bookingError = action.error.message
        })
        
    }
})

export const BookingActions = bookingSlice.actions

export default bookingSlice.reducer