import { Link } from "react-router-dom"
import HeartButton from "../HeartButton"
import StarRateIcon from '@mui/icons-material/StarRate';


const ListingPlaceCard= ({listing, onAction, handleAction, actionLabel}) => {

  console.log('listing', listing)


  const reviewSum = listing?.reviews?.reduce((accumulator, currentValue) => 
      accumulator + currentValue.rating, 0)

  const reviewAvg = listing?.reviews?.length > 0 ? (reviewSum / listing?.reviews?.length).toFixed(2) : 0;


  console.log("listing?.reviews?.length", listing?.reviews?.length)
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
            <div className="flex justify-between">
              <h1 className="font-semibold text-lg">
                {listing?.title}
              </h1>
              
              <div className="flex items-center gap-1 text-lg ">
              
                <StarRateIcon
                    // size={24}
                    className=" text-black"/>
                  <p>
                  {reviewAvg }
                  </p>
                  
              </div>

            </div>

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