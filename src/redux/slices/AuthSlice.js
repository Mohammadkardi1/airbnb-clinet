import { createSlice } from "@reduxjs/toolkit"
import { loginUser, 
        registerUser, 
        googleLogin,
        verifyEmail,
        resendVerification  } from '../actions/AuthActions'


const initialState = {
    user: {},
    loading: false,
    authError: '', 
    isVerified: false
}


const AuthSlice = createSlice({
    name: "auth", 
    initialState,
    reducers: {
        // loginGoogle: (state, action) => {
        //     // const { sub: token, ...rest } = action?.payload;
        //     localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
        //     state.user = action?.payload
        // },
        logout: (state) => {
            localStorage.clear()
            state.user = {}
        },
        loginByToken: (state) => {
            state.user = JSON.parse(localStorage.getItem('profile'))
        },
        clearAuthError: (state) => {
            state.authError = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.authError = ''
            state.user = {}
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.authError = action?.payload.message
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.authError = action?.payload
        })



        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.authError = ''
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action?.payload
            localStorage.setItem('profile', JSON.stringify({...action?.payload}))
            state.authError = ''
            state.isVerified = true
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.user = {}
            state.authError = action?.payload
        })


        builder.addCase(verifyEmail.pending, (state) => {
            state.loading = true
            state.authError = ''
        })
        builder.addCase(verifyEmail.fulfilled, (state, action) => {
            state.loading = false
            state.isVerified = true
            state.authError = ''
        })
        builder.addCase(verifyEmail.rejected, (state, action) => {
            state.loading = false
            state.isVerified = false
            state.authError = action?.payload
        })



        builder.addCase(resendVerification.pending, (state) => {
            state.loading = true
            state.authError = ''
        })
        builder.addCase(resendVerification.fulfilled, (state, action) => {
            state.loading = false
            state.authError = action?.payload.message
        })
        builder.addCase(resendVerification.rejected, (state, action) => {
            state.loading = false
            state.authError = action?.payload
        })



        builder.addCase(googleLogin.pending, (state) => {
            state.loading = true
            state.authError = ''
        })
        builder.addCase(googleLogin.fulfilled, (state, action) => {
            state.loading = false
            state.user = action?.payload
            localStorage.setItem('profile', JSON.stringify({...action?.payload}))
            state.authError = ''
        })
        builder.addCase(googleLogin.rejected, (state, action) => {
            state.loading = false
            state.user = {}
            state.authError = action?.payload
        })


    }
})

export const AuthActions = AuthSlice.actions

export default AuthSlice.reducer