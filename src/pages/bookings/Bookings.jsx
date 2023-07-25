import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
import { getReservations } from "../../redux/actions/BookingActions"
import UserBookings from './UserBookings'


const Bookings = () => {

  const dispatch = useDispatch()
  const {loading, reservations} = useSelector(state => state.booking)

  useEffect(() => {
    dispatch(getReservations())
  }, [])




  return (
    <>


    {
    loading  ?
        <PageLoadingModel/>
    :
    <>
    {reservations.length === 0 ?
        <EmptyState  
            title={'No reservations found'} 
            subtitle={'Looks like you have no reservations on your properties.'} />
    :
    <>
        {/* <div className=" space-y-4 mt-4">
        { reservations.map((place, index) => (
            <ListingUserPlace  key={index} place={place}/>
        ))}
        </div> */}
        <div className="text-start mb-8">
            <div className="text-2xl font-bold">
              Reservations
            </div>
            <div className="font-light text-neutral-500 mt-2">
              Bookings on your own properties
            </div>
        </div>


        <UserBookings listings={reservations}/>


    </>
    }
    </>
    }

    </>
  )
}


export default Bookings