import { Link } from "react-router-dom"
import HeartButton from "../HeartButton"
import {format} from "date-fns";


const ListingBookingCard= ({ listing }) => {

    

  return (
    <>
    { listing && 
      <div className="relative">



        <Link to={`/place/${listing?.place?._id}`} 
          className="col-span-1 cursor-pointer group">
            
          <div className="flex flex-col gap-2 w-full">
            <div className="aspect-square w-full overflow-hidden rounded-xl">
              <img
                className="object-cover h-full w-full group-hover:scale-110 transition"
                src={listing?.place?.photos[0]?.url}
                alt="Listing"
              />
            </div>
            <div>
                <h1 className="font-semibold text-lg">
                    {listing?.place?.title}
                </h1>
                <p className="font-light text-neutral-500">
                    {`${listing?.place?.location?.region}, ${listing?.place?.location?.label}`}
                </p>
            </div>




            <div className="flex gap-1  font-light text-neutral-500">

                <div className="flex items-center gap-1">
                    {format(new Date(parseInt(listing?.checkIn)), 'dd MMMM yyyy')}
                </div>
                &nbsp;
                &bull;
                &nbsp;
                <div className="flex items-center gap-1">
                    {format(new Date(parseInt(listing?.checkOut)), 'dd MMMM yyyy')}
                </div>

            </div>




            <div className="flex gap-2 font-medium text-md">
                <h1>
                    {listing?.numberOfNights} {listing?.numberOfNights > 1 ? "nights/" : "night/"}
                </h1>
                <p>
                    ${listing?.price}
                </p>
            </div>



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
 
export default ListingBookingCard