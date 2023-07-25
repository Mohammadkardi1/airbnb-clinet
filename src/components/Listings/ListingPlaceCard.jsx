import { Link } from "react-router-dom"
import HeartButton from "../HeartButton"


const ListingPlaceCard= ({listing, onAction, handleAction, actionLabel}) => {

    

  return (
    <>
    { listing && 
      <div className="relative">

        <div className="absolute z-10 top-3 right-3">
            <HeartButton 
              listingId={listing?._id} 
              favorites = {listing?.favorites}
              // currentUser={currentUser}
            />
        </div>


        <Link to={`/place/${listing?._id}`} 
          className="col-span-1 cursor-pointer group">
            
          <div className="flex flex-col gap-2 w-full">
            <div className="aspect-square w-full overflow-hidden rounded-xl">
              <img
                className="object-cover h-full w-full group-hover:scale-110 transition"
                src={listing?.photos[0]?.url}
                alt="Listing"
              />

              
            </div>
            <h1 className="font-semibold text-lg">
              {listing?.title}
            </h1>
            <p className="font-light text-neutral-500">
              {`${listing?.location?.region}, ${listing?.location?.label}`}
            </p>

            <p className="font-semibold">$ {listing?.price} per night </p>



            {/* {onAction && actionLabel && (
              <button
                // disabled={disabled}
                // small
                // label={actionLabel} 
                onClick={handleAction}
              >
                {actionLabel}
              </button>
            )} */}
          </div>
        </Link>
      </div>
    }
    </>
   )
}
 
export default ListingPlaceCard