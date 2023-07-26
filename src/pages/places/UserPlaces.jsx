import ListingPlaceCard from "../../components/Listings/ListingPlaceCard";

// import ListingCard from "@/app/components/listings/ListingCard";



const UserPlaces =  ({listings}) => {




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
            activateActions={true}
            // actionId={listing.id}
            // activateActions={onDelete}
            // disabled={deletingId === listing.id}
            // actionLabel="Delete property"
            // currentUser={currentUser}
          />
        ))}
      </div>
      

      
    {/* </Container> */}
    </>
   );
}
 
export default UserPlaces;