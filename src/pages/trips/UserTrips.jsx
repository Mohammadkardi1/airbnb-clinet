import React from 'react'
import ListingBookingCard from '../../components/Listings/ListingBookingCard'

const UserTrips = ({listings}) => {

  return (
    <div 
      className="mt-6 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-x-6 gap-y-8">
      {listings?.map((listing) => (
        <ListingBookingCard
          key={listing?._id}
          listing={listing}
        />
      ))}
    </div>
  )
}

export default UserTrips