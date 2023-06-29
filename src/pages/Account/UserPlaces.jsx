import {Link, useParams} from "react-router-dom"
import {useEffect} from "react"
import PlaceForm from "../../components/Form/PlaceForm"
import { useSelector } from "react-redux"
import PageLoadingModel from "../../components/Models/PageLoadingModel"
import EmptyState from "../../components/EmptyState"
import { useState } from "react"
import ListingUserPlace from "../../components/Listings/ListingUserPlace"

const UserPlaces = () => {
  const {places, loading} = useSelector(state => state.place)
  const [ userPlaces, setUserPlaces ] = useState([])


  const userId = JSON.parse(localStorage.getItem('profile'))._id
  
  useEffect(() => {
    setUserPlaces(places.filter(place =>  place?.owner._id === userId))
  }, [places])

  return (
    <>
    
    {
      loading  ?
      <PageLoadingModel/>
    :
      <>
      {
        userPlaces.length === 0 ?
        <EmptyState  
          title={'No places added'} 
          subtitle={'Add the places you want to rent out.'} />
      :
      <>
        <div className=" space-y-4 mt-4">
          { userPlaces.map((place, index) => (
            <ListingUserPlace  key={index} place={place}/>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to={'/account/places/new'} className="inline-flex gap-1 bg-brand text-white py-2 px-6 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new place
          </Link>
        </div>
      </>
      }
      </>
    }
    </>
  );
}

export default UserPlaces