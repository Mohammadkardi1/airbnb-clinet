import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/API'


export const getAllPlaces = createAsyncThunk('place/getAllPlaces', () => {
    return api.getAllPlaces().then((response) => response.data)
})

export const getPlace = createAsyncThunk('place/getPlace', (id) => {
    return api.getPlace(id).then((response) => response.data)
})

export const getUserplaces = createAsyncThunk('place/userplaces', () => {
    return api.getUserplaces().then((response) => response.data)
})

export const getPlacesBySearch = createAsyncThunk('place/getPlacesBySearch', (searchQuery) => {
    return api.getPlacesBySearch(searchQuery).then((response) => response.data)
})

export const createPlace = createAsyncThunk('place/createPlace', (place) => {
    return api.createPlace(place).then((response) => response.data)
})

export const removePlace = createAsyncThunk('place/removePlace', (placeID) => {
    return api.removePlace(placeID).then((response) => response.data)
})

export const setUnavailableDates = createAsyncThunk('place/setUnavailableDates', (payload) => {
    const { placeID, timestamps } = payload;
    return api.setUnavailableDates(placeID, timestamps).then((response) => response.data)
})

export const favoritePlace = createAsyncThunk('place/favoritePlace', (placeID) => {
    return api.favoritePlace(placeID).then((response) => response.data)
})

export const getFavoritePlaces = createAsyncThunk('place/getFavoritePlaces', () => {
    return api.getFavoritePlaces().then((response) => response.data)
})

export const reviewPlace = createAsyncThunk('place/reviewPlace', async (payload) => {
    return api.reviewPlace(payload.placeID, payload.review).then((response) => response.data)
})

export const editPlace = createAsyncThunk('place/editPlace', async (payload) => {
    return api.editPlace(payload.placeID, payload.place).then((response) => response.data)
})
