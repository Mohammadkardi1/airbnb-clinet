import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/API'


export const getAllPlaces = createAsyncThunk('place/getAllPlaces', () => {
    return api.getAllPlaces().then((response) => response.data)
})

export const createPlace = createAsyncThunk('place/createPlace', (place) => {
    return api.createPlace(place).then((response) => response.data)
})

export const removePlace = createAsyncThunk('place/removePlace', (id) => {
    return api.removePlace(id).then((response) => response.data)
})

export const setUnavailableDates = createAsyncThunk('place/setUnavailableDates', (payload) => {
    const { id, timestamps } = payload;
    return api.setUnavailableDates(id, timestamps).then((response) => response.data)
})
