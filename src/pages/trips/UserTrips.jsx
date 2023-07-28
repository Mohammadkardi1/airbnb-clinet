import React from 'react'
import ListingBookingCard from '../../components/Listings/ListingBookingCard'
import ListingPlaceCard from '../../components/Listings/ListingPlaceCard'

const UserTrips = ({listings,currentUser}) => {




  return (
    <div 
      className="mt-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-x-6 gap-y-8">
      {listings?.map((listing) => (
        <ListingBookingCard
          key={listing?._id}
          listing={listing}
          // actionId={listing.id}
          // onAction={onDelete}
          // disabled={deletingId === listing.id}
          // actionLabel="Delete property"
          // currentUser={currentUser}
        />
      ))}
    </div>
  )
}

export default UserTrips