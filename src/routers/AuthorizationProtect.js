import React from 'react'
import { Navigate, useLocation  } from 'react-router-dom'



const AuthorizationProtect = ({children}) => {
    const location = useLocation()
    const user = JSON.parse(localStorage.getItem('profile'))


    return user?.username  ?  children : <Navigate to='/login' state={{ path:location.pathname}}/>
}

export default AuthorizationProtect