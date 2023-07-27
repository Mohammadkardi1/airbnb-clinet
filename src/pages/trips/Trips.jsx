import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
import { getTrips } from '../../redux/actions/BookingActions'
import UserTrips from './UserTrips'




const Trips = () => {


  const dispatch = useDispatch()
  const {loading, bookings} = useSelector(state => state.booking)



  useEffect(() => {
    dispatch(getTrips())

  }, [])



  return (
    <>

      {
      loading  ?
          <PageLoadingModel/>
      :
      <>
      {bookings?.length === 0 ?
          <EmptyState
              title={'No trips found'} 
              subtitle={'Looks like you have not reserved any trips.'} />
      :
      <>
          {/* <div className=" space-y-4 mt-4">
          { trips.map((place, index) => (
              <ListingUserPlace  key={index} place={place}/>
          ))}
          </div> */}
          <div className="text-start mb-8">
              <div className="text-2xl font-bold">
                Trips
              </div>
              <div className="font-light text-neutral-500 mt-2">
                Where you've been and where you're going
              </div>
          </div>


          <UserTrips listings={bookings}/>


      </>
      }
      </>
      }

    </>


    )
}

export default Trips