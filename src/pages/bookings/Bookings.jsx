import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
import SectionTitle from '../../components/SectionTitle'
import { getBookingsOnProperties } from "../../redux/actions/BookingActions"
import UserBookings from './UserBookings'
import PreInput from '../../components/PreInput'


const Bookings = () => {
  const dispatch = useDispatch()
  const {loading, futureBookings, pastBookings, bookingError} = useSelector(state => state.booking)


  useEffect(() => {
    dispatch(getBookingsOnProperties())
  }, [])



  if (loading) {
    return <PageLoadingModel isFixed={false}/>
  }


  if (bookingError) {
    return <div>Error: {bookingError}</div>
  }


  if (futureBookings?.length === 0 && pastBookings?.length === 0) {
    return (
      <EmptyState  
        title={'No bookings found'} 
        subtitle={'Looks like you have no bookings on your properties.'}
      />
    );
  }


  return (
    <>
        <SectionTitle
            title={'Bookings'}
            secondaryText={'Bookings on your own properties'}
          />


        <PreInput 
            header= 'Future Bookings'
          />
        <UserBookings listings={futureBookings}/>

        <div className=' mt-28'></div>

        
        <PreInput 
            header= 'Past Bookings'
          />
        <UserBookings listings={pastBookings}/>
    </>
  )
}


export default Bookings