import React from 'react'
import Navbar from './navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Container from './Container'

const Layout = () => {
  return (
    <div className='relative'>
      <Navbar/> 
      <Container>
        <Outlet/>
      </Container>
      <Footer/>
    </div>
  )
}

export default Layout