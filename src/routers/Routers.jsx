import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Layout from '../components/Layout'
import AuthForm from '../components/Form/AuthForm'
import MainAccountPage from '../pages/Account/MainAccountPage'
import AuthorizationProtect from './AuthorizationProtect'
import AuthenticationProtect from './AuthenticationProtect'
import Profile from '../pages/Account/Profile'
import UserBookings from '../pages/bookings/UserBookings'
import Places from '../pages/places/Places'
import PlacePage from '../pages/PlacePage'
import BookingSinglePage from '../pages/BookingSinglePage'
import EmailVerify from '../components/EmailVerify'
import PlaceForm from '../components/Form/PlaceForm'
import EditPlace from '../pages/editPlace/EditPlace'
import Bookings from '../pages/bookings/Bookings'
import Trips from '../pages/trips/Trips'
import Favorites from '../pages/favorites/Favorites'

const Routers = () => {


  const ProtectedAccountPage = () => <AuthorizationProtect><MainAccountPage/></AuthorizationProtect>


  return (
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Navigate to={'/home'}/>}/>
          <Route path='home' element={<Home/>}/>

          <Route path='login' element={<AuthenticationProtect><AuthForm type={"login"}/></AuthenticationProtect>}/>
          <Route path='register' element={<AuthenticationProtect><AuthForm type={"register"}/></AuthenticationProtect>}/>
          

          <Route path='account' element={<ProtectedAccountPage/>}>
            <Route index element={<Navigate to={'profile'}/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='bookings' element={<Bookings/>}/>
            <Route path='places' element={<Places/>}/>
            <Route path='trips' element={<Trips/>}/>
            <Route path='favorites' element={<Favorites/>}/>

          </Route>
          <Route path='account/places/new' element={<PlaceForm/>}/>
          <Route path='account/editPlace/:id' element={<EditPlace/>}/>

          <Route path='booking/:id' element={<BookingSinglePage/>}/>
          <Route path='place/:id' element={<PlacePage/>}/>
          <Route path='/api/auth/:id/verify/:token' element={<EmailVerify/>}/>
        </Route>
    </Routes>
  )
}

export default Routers