import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
import SectionTitle from '../../components/SectionTitle'
import { getBookingsOnProperties } from "../../redux/actions/BookingActions"
import UserBookings from './UserBookings'
import PreInput from '../../components/PreInput'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';


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

        <div className='flex items-center gap-1 font-semibold'>
          <MdKeyboardDoubleArrowRight size={34}/>
          <PreInput 
              header= 'Future Bookings'
            />
        </div>
        <UserBookings listings={futureBookings}/>

        <div className=' mt-28'></div>

        <div className='flex items-center gap-1 font-semibold'>
          <MdKeyboardDoubleArrowRight size={34}/>
          <PreInput 
              header= 'Past Bookings'
            />
        </div>
        <UserBookings listings={pastBookings}/>
    </>
  )
}


export default Bookings