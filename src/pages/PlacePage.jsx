import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Gallery from '../components/Gallery';
import ListingCategory from '../components/Listings/ListingCategory'
import Map from "../components/Map";
import BookingForm from "../components/Form/BookingForm";
import Avatar from "../components/Avatar";
import PageLoadingModel from "../components/Models/PageLoadingModel";
import ListingPerks from "../components/Listings/ListingPerks";
// import AddressLink from "../AddressLink";
import moment from 'moment';
import useCountries from "../hooks/useCountries";
import ListingReview from "../components/Listings/ListingReview";
import ReviewForm from "../components/Form/ReviewForm";
import { getPlace } from "../redux/actions/PlaceActions";
import SectionTitle from "../components/SectionTitle";










const PlacePage = () => {
  const {id} = useParams();
  const [nextItems, setNextItems] = useState(6)
  const dispatch = useDispatch()
  const {places, loading, placeFavorite} = useSelector((state) => state.place)


  useEffect(() => {
    dispatch(getPlace(id))
  }, []);

  

  const { getByValue } = useCountries()
  const coordinates = getByValue(places[0]?.location?.value)?.latlng

  const loadMoreHandler = () => {
    setNextItems(nextItems+3)
  }


  return (
    <>
    {loading  ?
    <PageLoadingModel isFixed={false}/>
    :
    <>
    {places[0]  &&
      <div className="mt-8">
      <SectionTitle
          title={places[0]?.title}
          secondaryText={`${places[0]?.location?.region}, ${places[0]?.location?.label}`}
        />
      <Gallery place={places[0]} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 lg:grid-cols-[2fr_1fr]">



        <div className="flex flex-col gap-8 mt-20 static z-[1]">
          <div className="flex flex-col gap-8">
            <div className=" space-y-2">
              <h1 className="plain-title font-semibold">Hosted by</h1>
              <div className="flex items-center gap-3">
                <Avatar src={places[0]?.owner?.picture} alt ={places[0]?.owner?.username} />
                <div className="plain-text">
                  <p>{places[0]?.owner?.username}</p>
                  <p className=" text-gray-500">{moment(places[0]?.createdAt).fromNow()}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center gap-4 plain-text font-light text-neutral-500">
              <p>{places[0]?.maxGuests} guests</p>
              <p>{places[0]?.rooms} rooms</p>
              <p>{places[0]?.bathrooms} bathrooms</p>
            </div>
          </div>

          <hr />
          <ListingCategory
              label={places[0]?.category}
            />
          <hr />
          <div>
                <h2 className="plain-title font-semibold mb-3">Description</h2>
                <p className="text-lg font-light plain-text text-neutral-500">
                  {places[0]?.description}
                </p>
          </div>
          {places[0]?.perks?.length > 0  &&
          <>
          <hr />
          <div>
              <h2 className="plain-title font-semibold mb-3">Perks</h2>
              <div className=" grid grid-cols-2 gap-2">
              {
                places[0]?.perks?.map((name, index) => (
                  <ListingPerks key={index} name={name}/>
                ))
              }
              </div>
          </div>
          </>
          }
          {places[0]?.extraInfo?.replace(/\s+/g, '') &&
          <>
            <hr />
            <div>
                <h2 className="plain-title font-semibold mb-3">Extra info</h2>
                <p className="text-lg font-light plain-text text-neutral-500">
                  {places[0]?.extraInfo}
                </p>
            </div>
          </>
          }

          <hr />
          <Map center={coordinates} />
        </div>
        <BookingForm place={places[0]} />
      </div>
      <ReviewForm placeID={places[0]?._id}/>
      {places[0]?.reviews?.length > 0 &&
      <>
      <div className="mt-12">
        <h2 className="plain-title font-semibold mb-4">Reviews</h2>
        <div className=" space-y-8">
          {
              places[0]?.reviews?.slice(0, nextItems)?.map((review, index) => (
                <ListingReview key={index} review={review}/>
              ))
          }
        </div>
      </div>
      <div className="flex justify-center">
        {places[0]?.reviews?.length >= 6 && places[0]?.reviews?.length > nextItems &&
        <button
            className="primary px-8"
            onClick={loadMoreHandler}>
            Load more
        </button>
        }
      </div>
      </>
      }
      </div>
    }
    </>
    }
    {
      placeFavorite &&
      <PageLoadingModel/>
    }
    </>
  );
}

export default PlacePage