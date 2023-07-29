import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
import PreInput from '../../components/PreInput'
import SectionTitle from '../../components/SectionTitle'
import { getTrips } from '../../redux/actions/BookingActions'
import UserTrips from './UserTrips'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';




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
          <div className='flex items-center gap-1 font-semibold'>
            <MdKeyboardDoubleArrowRight size={34}/>
            <PreInput 
                header= 'Future Trips'
              />
          </div>
          <UserTrips listings={futureBookings}/>
        </>
        }


        <div className=' mt-20'></div>
        {pastBookings?.length > 0 &&
        <>
        <div className='flex items-center gap-1 font-semibold'>
          <MdKeyboardDoubleArrowRight size={34}/>
          <PreInput 
            header= 'Past Trips'
          />
          </div>
          <UserTrips listings={pastBookings}/>
        </>
        }
      </>
    )
}

export default Trips