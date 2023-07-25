import { createSlice } from "@reduxjs/toolkit"
import { createPlace, 
        getAllPlaces, 
        removePlace, 
        setUnavailableDates,
        getUserplaces,
        favoritePlace,
        getFavoritePlaces } from "../actions/PlaceActions"


const initialState = {
    places: [],
    // clientPlaces: [],
    // favoritePlaces: [],
    loading: false,
    placeError: '', 
}


const PlaceSlice = createSlice({
    name: "place", 
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action?.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getAllPlaces.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(getAllPlaces.fulfilled, (state, action) => {
            state.loading = false
            state.places = action?.payload.data
            state.placeError = ''
        })
        builder.addCase(getAllPlaces.rejected, (state, action) => {
            state.loading = false
            state.places = []
            state.placeError = action.error.message
        })




        builder.addCase(getUserplaces.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(getUserplaces.fulfilled, (state, action) => {
            state.loading = false
            state.places = action?.payload.data
            state.placeError = ''
        })
        builder.addCase(getUserplaces.rejected, (state, action) => {
            state.loading = false
            state.places = []
            state.placeError = action.error.message
        })



        builder.addCase(createPlace.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(createPlace.fulfilled, (state, action) => {
            state.places.push(action.payload.data)
            state.placeError = ''
            state.loading = false
        })
        builder.addCase(createPlace.rejected, (state, action) => {
            state.loading = false
            state.placeError = action.error.message
        })





        builder.addCase(removePlace.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(removePlace.fulfilled, (state, action) => {
            state.loading = false
            state.places = state.places.filter(item => item._id !== action.payload.data._id)
            state.placeError = ''
        })
        builder.addCase(removePlace.rejected, (state, action) => {
            state.loading = false
            state.placeError = action.error.message
        })





        builder.addCase(setUnavailableDates.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(setUnavailableDates.fulfilled, (state, action) => {
            state.loading = false
            state.places = state.places.map((place) => {
                if (place._id === action.payload.data._id ) {
                    return action.payload.data
                } else {
                    return place
                }
            })
            state.placeError = ''
        })
        builder.addCase(setUnavailableDates.rejected, (state, action) => {
            state.loading = false
            state.placeError = action.error.message
        })




        builder.addCase(favoritePlace.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(favoritePlace.fulfilled, (state, action) => {
            state.loading = false
            state.places = state.places.map((place) => {
                if (place._id === action.payload.data._id) {
                    return action.payload.data
                } else {
                    return place
                }
            })
            state.placeError = ''
        })
        builder.addCase(favoritePlace.rejected, (state, action) => {
            state.loading = false
            state.placeError = action.error.message
        })


        builder.addCase(getFavoritePlaces.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(getFavoritePlaces.fulfilled, (state, action) => {
            state.loading = false
            state.places = action?.payload.data
            state.placeError = ''
        })
        builder.addCase(getFavoritePlaces.rejected, (state, action) => {
            state.loading = false
            state.places = []
            state.placeError = action.error.message
        })


    }
})

export const PlaceActions = PlaceSlice.actions

export default PlaceSlice.reducer