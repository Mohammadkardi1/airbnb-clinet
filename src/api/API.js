import axios from 'axios'


const API = axios.create({baseURL: 'http://localhost:5000'})

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
export const getUserplaces = () => API.get('/api/place/userPlaces' )
export const createPlace = (placeInfo) => API.post('/api/place/addPlace', placeInfo)
export const removePlace = (id) => API.delete(`/api/place/removePlace/${id}`)
export const setUnavailableDates = (id, timestamps) => API.patch(`/api/place/unavailableDates/${id}`, {timestamps})
export const favoritePlace = (id) => API.patch(`/api/place/favoritePlace/${id}`)
export const getFavoritePlaces = () => API.get(`/api/place/getFavoritePlaces`)




export const getAllBookings = () => API.get('/api/booking/allBookings')
export const addBooking = (bookingInfo) => API.post('/api/booking/addBooking', bookingInfo)
export const getTrips = () => API.get('/api/booking/trips' )
export const getReservations = () => API.get('/api/booking/reservations' )




