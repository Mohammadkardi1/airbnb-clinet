import { configureStore } from "@reduxjs/toolkit"
// import PostSlice from "./slices/PostSlice"
import AuthSlice from "./slices/AuthSlice"
import PlaceSlice from "./slices/PlaceSlice"
import bookingSlice from './slices/BookingSlice'

const Store = configureStore({
    reducer: {
        auth: AuthSlice,
        place: PlaceSlice,
        booking: bookingSlice
    }
})

export default Store