import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
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
        <PageLoadingModel/>
    :
    <>
    {bookings.length === 0 ?
        <EmptyState  
            title={'No bookings found'} 
            subtitle={'Looks like you have no bookings on your properties.'} />
    :
    <>
        {/* <div className=" space-y-4 mt-4">
        { bookings.map((place, index) => (
            <ListingUserPlace  key={index} place={place}/>
        ))}
        </div> */}
        <div className="text-start mb-8">
            <div className="text-2xl font-bold">
              Bookings
            </div>
            <div className="font-light text-neutral-500 mt-2">
              Bookings on your own properties
            </div>
        </div>


        <UserBookings listings={bookings}/>


    </>
    }
    </>
    }

    </>
  )
}


export default Bookings