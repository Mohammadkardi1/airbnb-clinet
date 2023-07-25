import { createSlice } from "@reduxjs/toolkit"
import { addBooking,
        getAllBookings,
        getTrips,
        getReservations } from "../actions/BookingActions"


const initialState = {
    bookings: [],
    trips: [],
    reservations: [],
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







        builder.addCase(getTrips.pending, (state) => {
            state.loading = true
            state.bookingError = ''
        })
        builder.addCase(getTrips.fulfilled, (state, action) => {
            state.loading = false
            state.trips = action?.payload.data
            state.bookingError = ''
        })
        builder.addCase(getTrips.rejected, (state, action) => {
            state.loading = false
            state.trips = []
            state.bookingError = action.error.message
        })





        builder.addCase(getReservations.pending, (state) => {
            state.loading = true
            state.bookingError = ''
        })
        builder.addCase(getReservations.fulfilled, (state, action) => {
            state.loading = false
            state.reservations = action?.payload.data
            state.bookingError = ''
        })
        
        builder.addCase(getReservations.rejected, (state, action) => {
            state.loading = false
            state.reservations = []
            state.bookingError = action.error.message
        })
        
    }
})

export const BookingActions = bookingSlice.actions

export default bookingSlice.reducer