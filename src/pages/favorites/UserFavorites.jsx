import React from 'react'
import ListingPlaceCard from '../../components/Listings/ListingPlaceCard'

const UserFavorites = ({listings}) => {
  return (
    <>
     {/* <Container> */}
      {/* <Heading
        title="Properties"
        subtitle="List of your properties"
      /> */}
      
      <div 
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((listing) => (
          <ListingPlaceCard
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
      

      
    {/* </Container> */}
    </>
  )
}

export default UserFavorites