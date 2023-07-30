import { Link } from "react-router-dom"
import HeartButton from "../HeartButton"
import StarRateIcon from '@mui/icons-material/StarRate';
import { useDispatch, useSelector } from "react-redux";
import { removePlace } from "../../redux/actions/PlaceActions";
import { useNavigate } from "react-router-dom";
import PageLoadingModel from "../Models/PageLoadingModel";

const ListingPlaceCard= ({listing, activateActions = false, handleAction, actionLabel}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {placeRemoving, placeFavorite} = useSelector(state => state.place)



  const reviewSum = listing?.reviews?.reduce((accumulator, currentValue) => 
      accumulator + currentValue.rating, 0)

  const reviewAvg = listing?.reviews?.length > 0 ? (reviewSum / listing?.reviews?.length).toFixed(1) : 0;


  const deleteHandler = async () => {
    try {
      await dispatch(removePlace(listing?._id))
    } catch (error) {
      console.log(error)
    }
  }

  const editHandler = () => {
    navigate(`/account/places/new?placeId=${listing?._id}`)
  }


  return (
    <>
    { listing && 
      <div className="relative flex flex-col justify-between">
        <div className="absolute z-10 top-3 right-3">
          {
            JSON.parse(localStorage.getItem('profile'))?._id &&
            <HeartButton 
              listingId={listing?._id} 
              favorites = {listing?.favorites}
            />
          }
        </div>
        <Link to={`/place/${listing?._id}`} 
          className="col-span-1 cursor-pointer group">
          <div className="flex flex-col gap-1 w-full">
            <div className="aspect-square w-full overflow-hidden rounded-xl">
              <img
                className="object-cover h-full w-full group-hover:scale-110 transition"
                src={listing?.photos[0]?.url}
                alt="Listing"
              />
            </div>
            <div className="flex justify-between card-title">
              <h1 className="font-semibold ">
                {listing?.title?.split(' ').slice(0, 10).join(' ')}
                {listing?.title?.split(' ').length >= 10 ? '...' : ''}
              </h1>
              <div className="flex items-center gap-1">
                <StarRateIcon
                    className="text-black"/>
                  <p>
                  {reviewAvg }
                  </p>
              </div>
            </div>
            <p className="font-light plain-text text-neutral-500">
              {`${listing?.location?.region}, ${listing?.location?.label}`}
            </p>
            <p className="font-semibold  card-title">$ {listing?.price} per night </p>
          </div>
        </Link>

        {
          activateActions &&
        <div className="flex justify-between gap-2 mt-2">
          <div className=" flex justify-center items-center gap-2 text-brand cursor-pointer"
            onClick={editHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit
          </div>
          <div className=" flex justify-center items-center gap-2 text-red-600 cursor-pointer"
            onClick={deleteHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Delete
          </div>
        </div>
        }
        {
          placeRemoving &&
          <PageLoadingModel/>
        }
        {
          placeFavorite &&
          <PageLoadingModel/>
        }
      </div>
    }
    </>
   )
}
 
export default ListingPlaceCard