import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import Gallery from '../components/Gallery';
import ListingCategory from '../components/Listings/ListingCategory'
import Map from "../components/Map";
import BookingForm from "../components/Form/BookingForm";
import Avatar from "../components/Avatar";
import PageLoadingModel from "../components/Models/PageLoadingModel";
import ListingPerks from "../components/Listings/ListingPerks";
// import AddressLink from "../AddressLink";

import useCountries from "../hooks/useCountries";
import ListingReview from "../components/Listings/ListingReview";
import ReviewForm from "../components/Form/ReviewForm";










const PlacePage = () => {
  const {id} = useParams();
  const [place, setPlace] = useState({})

  

  
  const {places, loading} = useSelector((state) => state.place)


  useEffect(() => {
    // window.scrollTo(0, 0)
    const foundPlace  = places.find(place => place._id === id)
    setPlace(foundPlace)
  }, [places]);

  

  const { getByValue } = useCountries()
  // const location = getByValue(locationValue)
  const coordinates = getByValue(place?.location?.value)?.latlng



  return (
    <>
    {
      loading  ?
      <PageLoadingModel/>
    :
    <>
    {place  &&
      <div className="mt-8">


      <div className="text-start mb-8">
        <div className="text-2xl font-bold">
          {place?.title}
        </div>
        <div className="font-light text-neutral-500 mt-2">
          {`${place?.location?.region}, ${place?.location?.label}`}
        </div>
      </div>



      <Gallery place={place} />


        

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-8 mt-20 static z-[1]">
        <div className="flex flex-col gap-2">
          <div 
            className="text-xl font-semibold flex flex-row items-center gap-2">
            <div>Hosted by {place?.owner?.username}</div>
            <Avatar src={place?.owner?.picture} altText={place?.owner?.username} />
          </div>



          <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
            <p>{place?.maxGuests} guests</p>
            <p>{place?.rooms} rooms</p>
            <p>{place?.bathrooms} bathrooms</p>
          </div>

        </div>

        <hr />


        {/* {category && (
          <ListingCategory
            icon={category.icon} 
            label={category?.label}
            description={category?.description} 
          />
        )} */}

          <ListingCategory
            label={place?.category}
          />
        <hr />


        <div className="text-lg font-light text-neutral-500">
          {place?.description}
        </div>


        {place?.perks?.length > 0  &&
        <>
        <hr />
        <div>
            <h2 className="font-semibold text-2xl mb-3">Perks</h2>
            <div className=" grid grid-cols-2 gap-2">
            {
              place?.perks?.map((name, index) => (
                <ListingPerks key={index} name={name}/>
              ))
            }
            </div>
        </div>
        </>
        }
        {place?.extraInfo?.replace(/\s+/g, '') &&
        <>
          <hr />
          <div>
              <h2 className="font-semibold text-2xl mb-3">Extra info</h2>
              <p className="text-lg font-light text-neutral-500">
                {place?.extraInfo}
              </p>
          </div>
        </>
        }


        <hr />


        <Map center={coordinates} />


      </div>



      <BookingForm place={place} />


      </div>



        <div className="mt-12">
          <h2 className="font-semibold text-2xl mb-4">Reviews</h2>
          <div className=" space-y-8">
            {
                place?.reviews?.map((review, index) => (
                  <ListingReview key={index} review={review}/>
                ))
            }
          </div>
        </div>


        <ReviewForm placeID={place?._id}/>


          {/* <div className="col-lg-12 mt-5  text-center">
              <h2 className="related__title">
                  You might also like
              </h2>
          </div>
          <ProductList data={relatedProducts}/> */}

      </div>
    }
    </>
    }
    </>
  );
}

export default PlacePage