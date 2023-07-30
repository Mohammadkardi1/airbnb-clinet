import ListingPlaceCard from "../../components/Listings/ListingPlaceCard";

// import ListingCard from "@/app/components/listings/ListingCard";



const UserProperties =  ({listings}) => {




  return ( 
      <div 
        className="mt-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-x-6 gap-y-8">
        {listings?.map((listing) => (
          <ListingPlaceCard
            key={listing?._id}
            listing={listing}
            activateActions={true}
          />
        ))}
      </div>
   );
}
 
export default UserProperties;