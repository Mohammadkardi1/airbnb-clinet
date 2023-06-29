import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/API'


export const registerUser = createAsyncThunk('auth/registerUser',
    async (userInfo, { rejectWithValue }) => {
      try {
        return await api.registerUser(userInfo).then((response) => response.data)
      } catch (error) {
        return rejectWithValue(error.response.data.message)
      }
    }
  )


export const loginUser = createAsyncThunk('auth/loginUser', 
    async (userInfo, { rejectWithValue }) => {
        try {
          return await api.loginUser(userInfo).then((response) => response.data)
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
})


export const verifyEmail = createAsyncThunk('auth/verifyEmail', 
    async (payload, { rejectWithValue }) => {
      try {
        return await api.verifyEmail(payload.id, payload.token).then((response) => response.data)
      } catch (error) {
        return rejectWithValue(error.response.data.message)
      }
})

export const resendVerification = createAsyncThunk('auth/resendVerification', 
  async (email, { rejectWithValue }) => {
    try {
      return await api.resendVerification(email).then((response) => response.data)
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
})

export const googleLogin = createAsyncThunk('auth/googleLogin', (userInfo) => {
  return api.googleLogin(userInfo).then((response) => response.data)
})