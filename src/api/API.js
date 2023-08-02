import axios from 'axios'


const API = axios.create({baseURL: 'https://airbnb-api-3747.vercel.app/'})





// add the following headers to each outgoing HTTP request
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const registerUser = (userInfo) => API.post('/api/auth/register', userInfo)
export const loginUser = (userInfo) => API.post('/api/auth/login', userInfo)
export const verifyEmail = (id, token) => API.get(`/api/auth/${id}/verify/${token}`)
export const resendVerification = (email) => API.get(`/api/auth/resendVerification?email=${email}`)
export const googleLogin = (userInfo) => API.post('/api/auth/googleLogin', userInfo)



export const getAllPlaces = () => API.get('/api/place/allPlaces')
export const getPlace = (id) => API.get(`/api/place/getPlace/${id}`)
export const getPlacesBySearch = (searchQuery) => API.get(`/api/place/search?searchQuery=${searchQuery}` )
export const getUserplaces = () => API.get('/api/place/userPlaces' )
export const createPlace = (placeInfo) => API.post('/api/place/addPlace', placeInfo)
export const removePlace = (placeID) => API.delete(`/api/place/removePlace/${placeID}`)
export const setUnavailableDates = (placeID, timestamps) => API.patch(`/api/place/unavailableDates/${placeID}`, {timestamps})
export const favoritePlace = (placeID) => API.patch(`/api/place/favoritePlace/${placeID}`)
export const getFavoritePlaces = () => API.get(`/api/place/getFavoritePlaces`)
export const reviewPlace = (placeID, review) => API.post(`/api/place/reviewPlace/${placeID}`, review)
export const editPlace = (placeID, place) => API.patch(`/api/place/editPlace/${placeID}`, place)


export const getAllBookings = () => API.get('/api/booking/allBookings')
export const addBooking = (bookingInfo) => API.post('/api/booking/addBooking', bookingInfo)
export const getTrips = () => API.get('/api/booking/trips' )
export const getBookingsOnProperties = () => API.get('/api/booking/bookingsOnProperties' )

