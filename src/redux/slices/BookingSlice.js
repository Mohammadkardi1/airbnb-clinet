import { createSlice } from "@reduxjs/toolkit"
import { addBooking,
        getAllBookings,
        getTrips,
        getBookingsOnProperties } from "../actions/BookingActions"


const initialState = {
    bookings: [],
    futureBookings: [],
    pastBookings: [],
    // trips: [],
    // reservations: [],
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
            state.bookings.push(action.payload.data)
            state.bookingError = ''
        })
        builder.addCase(addBooking.rejected, (state, action) => {
            state.loading = false
            state.bookingError = action.error.message
        })







        builder.addCase(getTrips.pending, (state) => {
            state.loading = true
            state.bookingError = ''
        })
        builder.addCase(getTrips.fulfilled, (state, action) => {
            state.loading = false
            // state.bookings = action?.payload.data
            state.futureBookings = action?.payload.data.futureBookings
            state.pastBookings = action?.payload.data.pastBookings
            state.bookingError = ''
        })
        builder.addCase(getTrips.rejected, (state, action) => {
            state.loading = false
            state.bookings = []
            state.bookingError = action.error.message
        })




        //getReservations -> getBookingsOnProperties
        builder.addCase(getBookingsOnProperties.pending, (state) => {
            state.loading = true
            state.bookingError = ''
        })
        builder.addCase(getBookingsOnProperties.fulfilled, (state, action) => {
            state.loading = false
            // state.bookings = action?.payload.data
            state.futureBookings = action?.payload.data.futureBookings
            state.pastBookings = action?.payload.data.pastBookings
            state.bookingError = ''
        })
        builder.addCase(getBookingsOnProperties.rejected, (state, action) => {
            state.loading = false
            state.bookings = []
            state.bookingError = action.error.message
        })
        
    }
})

export const BookingActions = bookingSlice.actions

export default bookingSlice.reducer