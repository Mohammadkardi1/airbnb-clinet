import { createSlice } from "@reduxjs/toolkit"
import { createPlace, 
        getAllPlaces, 
        removePlace, 
        setUnavailableDates,
        getUserplaces,
        favoritePlace,
        getFavoritePlaces, 
        reviewPlace,
        getPlace,
        editPlace,
        getPlacesBySearch} from "../actions/PlaceActions"


const initialState = {
    places: [],
    // place: [],
    // clientPlaces: [],
    // favoritePlaces: [],
    loading: false,


    placeRemoving : false,
    placeReviewing : false,
    placeFavorite: false,
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



        builder.addCase(getPlace.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(getPlace.fulfilled, (state, action) => {
            state.loading = false
            state.places = [action?.payload.data]
            state.placeError = ''
        })
        builder.addCase(getPlace.rejected, (state, action) => {
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




        builder.addCase(getPlacesBySearch.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(getPlacesBySearch.fulfilled, (state, action) => {
            state.loading = false
            state.places = action?.payload.data
            state.placeError = ''
        })
        builder.addCase(getPlacesBySearch.rejected, (state, action) => {
            state.loading = false
            state.places = []
            state.placeError = action.error.message
        })




        builder.addCase(createPlace.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(createPlace.fulfilled, (state, action) => {
            state.places.unshift(action.payload.data)
            state.placeError = ''
            state.loading = false
        })
        builder.addCase(createPlace.rejected, (state, action) => {
            state.loading = false
            state.placeError = action.error.message
        })





        builder.addCase(removePlace.pending, (state) => {
            state.placeRemoving = true
            state.placeError = ''
        })
        builder.addCase(removePlace.fulfilled, (state, action) => {
            state.placeRemoving = false
            state.places = state.places.filter(item => item._id !== action.payload.data._id)
            state.placeError = ''
        })
        builder.addCase(removePlace.rejected, (state, action) => {
            state.placeRemoving = false
            state.placeError = action.error.message
        })





        builder.addCase(setUnavailableDates.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(setUnavailableDates.fulfilled, (state, action) => {
            state.loading = false
            state.places = [action?.payload.data]

            // state.places = state.places.map((place) => {
            //     if (place._id === action.payload.data._id ) {
            //         return action.payload.data
            //     } else {
            //         return place
            //     }
            // })
            state.placeError = ''
        })
        builder.addCase(setUnavailableDates.rejected, (state, action) => {
            state.loading = false
            state.placeError = action.error.message
        })




        builder.addCase(favoritePlace.pending, (state) => {
            state.placeFavorite = true
            state.placeError = ''
        })
        builder.addCase(favoritePlace.fulfilled, (state, action) => {
            state.placeFavorite = false
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
            state.placeFavorite = false
            state.placeError = action.error.message
        })





        builder.addCase(editPlace.pending, (state) => {
            state.loading = true
            state.placeError = ''
        })
        builder.addCase(editPlace.fulfilled, (state, action) => {
            state.loading = false
            // state.places = state.places.map((place) => {
            //     if (place._id === action.payload.data._id) {
            //         return action.payload.data
            //     } else {
            //         return place
            //     }
            // })
            state.placeError = ''
        })
        builder.addCase(editPlace.rejected, (state, action) => {
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




        // Checked
        builder.addCase(reviewPlace.pending, (state) => {
            state.placeReviewing = true
            state.placeError = ''
        })
        builder.addCase(reviewPlace.fulfilled, (state, action) => {
            state.placeReviewing = false
            state.places = [action?.payload.data]
            // state.places = state.places.map((place) => {
            //     if (place._id === action.payload.data._id) {
            //         return action.payload.data
            //     } else {
            //         return place
            //     }
            // })
            state.placeError = ''
        })
        builder.addCase(reviewPlace.rejected, (state, action) => {
            state.placeReviewing = false
            state.places = []
            state.placeError = action.error.message
        })


    }
})

export const PlaceActions = PlaceSlice.actions

export default PlaceSlice.reducer