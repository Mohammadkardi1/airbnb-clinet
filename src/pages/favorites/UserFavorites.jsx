import React from 'react'
import ListingPlaceCard from '../../components/Listings/ListingPlaceCard'

const UserFavorites = ({listings}) => {
  return (
    <div 
      className="mt-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-x-6 gap-y-8">
      {listings?.map((listing) => (
        <ListingPlaceCard
          key={listing?._id}
          listing={listing}
        />
      ))}
    </div>
  )
}

export default UserFavorites