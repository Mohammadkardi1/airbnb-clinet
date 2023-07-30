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
            
          <div className="flex flex-col gap-1 w-full">
            <div className="aspect-square w-full overflow-hidden rounded-xl">
              <img
                className="object-cover h-full w-full group-hover:scale-110 transition"
                src={listing?.place?.photos[0]?.url}
                alt="Listing"
              />
            </div>

            <h1 className="card-title font-semibold">
                {listing?.place?.title}
            </h1>
            <p className="plain-text font-light text-neutral-500">
                {`${listing?.place?.location?.region}, ${listing?.place?.location?.label}`}
            </p>

            <div className="plain-text flex gap-1 font-light text-neutral-500">
                <div className="flex items-center gap-1">
                    {format(new Date(parseInt(listing?.checkIn)), 'dd MMMM yyyy')}
                </div>
                &nbsp;&bull;&nbsp;
                <p className="flex items-center gap-1">
                    {format(new Date(parseInt(listing?.checkOut)), 'dd MMMM yyyy')}
                </p>
            </div>

            <h1 className="card-title flex gap-2 font-semibold">
                    {listing?.numberOfNights} {listing?.numberOfNights > 1 ? "nights/" : "night/"} ${listing?.price}
            </h1>
          </div>
        </Link>
      </div>
    }
    </>
   )
}
 
export default ListingBookingCard