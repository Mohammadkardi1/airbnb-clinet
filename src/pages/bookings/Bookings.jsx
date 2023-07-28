import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
import SectionTitle from '../../components/SectionTitle'
import { getBookingsOnProperties } from "../../redux/actions/BookingActions"
import UserBookings from './UserBookings'


const Bookings = () => {

  const dispatch = useDispatch()
  const {loading, bookings} = useSelector(state => state.booking)

  useEffect(() => {
    dispatch(getBookingsOnProperties())
  }, [])




  return (
    <>
    {
    loading  ?
        <PageLoadingModel isFixed={false}/>
    :
    <>
    {bookings.length === 0 ?
        <EmptyState  
            title={'No bookings found'} 
            subtitle={'Looks like you have no bookings on your properties.'} />
    :
    <>
        <SectionTitle
          title={'Bookings'}
          secondaryText={'Bookings on your own properties'}
        />
        <UserBookings listings={bookings}/>
    </>
    }
    </>
    }

    </>
  )
}


export default Bookings