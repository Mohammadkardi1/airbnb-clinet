import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PageLoadingModel from "../../components/Models/PageLoadingModel";
import EmptyState from "../../components/EmptyState";
import ListingUserBooking from "../../components/Listings/ListingUserBooking";




const UserBookings = () => {

  const user = JSON.parse(localStorage.getItem('profile'))
  const {  bookings, loading } = useSelector(state => state.booking)
  const [userBookings, setUserBookings] = useState()

  console.log('userBookings', userBookings)
  useEffect(() => {
    const foundBookings  = bookings.filter(booking => booking?.user === user?._id);
    setUserBookings(foundBookings)
  }, [bookings])


  return (
    <>
    {
      loading  ?
      <PageLoadingModel/>
    :
      <>
      {
      userBookings?.length === 0 ? 
        <EmptyState  title={'No places booked'} subtitle={'Explore existing places and book what you love.'} />
        :
        <div className=" space-y-4 mt-4">
          {userBookings?.length > 0 && 
            userBookings?.map((booking, index) => (
              <ListingUserBooking key={index} booking={booking}/>
          ))}
        </div>
      }
      </>
    }
    </>
  );
}

export default UserBookings