import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
import SectionTitle from '../../components/SectionTitle'
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
          <PageLoadingModel isFixed={false}/>
      :
      <>
      {bookings?.length === 0 ?
          <EmptyState
              title={'No trips found'} 
              subtitle={'Looks like you have not reserved any trips.'} />
      :
      <>
        <SectionTitle
          title={'Trips'}
          secondaryText={'Where you have been and where you are going'}
        />
      
        <UserTrips listings={bookings}/>
      </>
      }
      </>
      }

    </>


    )
}

export default Trips