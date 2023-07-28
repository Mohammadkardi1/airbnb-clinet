import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
import PreInput from '../../components/PreInput'
import SectionTitle from '../../components/SectionTitle'
import { getTrips } from '../../redux/actions/BookingActions'
import UserTrips from './UserTrips'




const Trips = () => {


  const dispatch = useDispatch()
  const {loading, futureBookings, pastBookings, bookingError} = useSelector(state => state.booking)



  useEffect(() => {
    dispatch(getTrips())

  }, [])



  if (loading) {
    return <PageLoadingModel isFixed={false} />
  }


  if (bookingError) {
    return <div>Error: {bookingError}</div>
  }


  if (futureBookings?.length === 0 && pastBookings?.length === 0) {
    return (
      <EmptyState
        title={'No trips found'}
        subtitle={'Looks like you have not reserved any trips.'}
      />
    );
  }



  return (
      <>
        <SectionTitle
          title={'Trips'}
          secondaryText={'Where you have been and where you are going'}
        />
        {futureBookings?.length > 0 &&
        <>
          <PreInput 
            header= 'Future Trips'
          />
          <UserTrips listings={futureBookings}/>
        </>
        }
        <div className=' mt-28'></div>
        {pastBookings?.length > 0 &&
        <>
          <PreInput 
            header= 'Past Trips'
          />
          <UserTrips listings={pastBookings}/>
        </>
        }
      </>
    )
}

export default Trips