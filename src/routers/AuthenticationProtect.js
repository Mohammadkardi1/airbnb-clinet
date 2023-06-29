import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthenticationProtect = ({children}) => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return user?.username ? <Navigate to='/home' />  : children
}

export default AuthenticationProtect