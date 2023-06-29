import { Link } from "react-router-dom"
import HeartButton from "../HeartButton"


const ListingPlaceCard= ({place}) => {

    

  return (
    <>
    { place && 
      <div className="relative">

        <div className="absolute z-10 top-3 right-3">
            <HeartButton 
            //   listingId={place.id} 
            // currentUser={currentUser}
            />
        </div>


        <Link to={`/place/${place?._id}`} 
          className="col-span-1 cursor-pointer group">
            
          <div className="flex flex-col gap-2 w-full">
            <div className="aspect-square w-full overflow-hidden rounded-xl">
              <img
                className="object-cover h-full w-full group-hover:scale-110 transition"
                src={place?.photos[0]?.url}
                alt="Listing"
              />

              
            </div>
            <h1 className="font-semibold text-lg">
              {place?.title}
            </h1>
            <p className="font-light text-neutral-500">
              {`${place?.location?.region}, ${place?.location?.label}`}
            </p>

            <p className="font-semibold">$ {place?.price} per night </p>



            {/* {onAction && actionLabel && (
              <Button
                disabled={disabled}
                small
                label={actionLabel} 
                onClick={handleCancel}
              />
            )} */}
          </div>
        </Link>
      </div>
    }
    </>
   )
}
 
export default ListingPlaceCard