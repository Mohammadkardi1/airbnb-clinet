import {Link} from "react-router-dom"
import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import PageLoadingModel from "../../components/Models/PageLoadingModel"
import EmptyState from "../../components/EmptyState"
import { getUserplaces } from "../../redux/actions/PlaceActions"
import UserPlaces from "./UserProperties"
// import PropertiesClient from "./PropertiesClient"


const UserProperties =  () => {
    const dispatch = useDispatch()
    const {loading, places} = useSelector(state => state.place)
  
    useEffect(() => {
      dispatch(getUserplaces())
    }, [])
  

  return (
    <>


    {
    loading  ?
        <PageLoadingModel/>
    :
    <>
    {places.length === 0 ?
        <EmptyState  
            title={'No properties found'} 
            subtitle={'Looks like you have no properties.'} />
    :
    <>
        {/* <div className=" space-y-4 mt-4">
        { places.map((place, index) => (
            <ListingUserPlace  key={index} place={place}/>
        ))}
        </div> */}
        <div className="text-start mb-8">
            <div className="text-2xl font-bold">
                Properties
            </div>
            <div className="font-light text-neutral-500 mt-2">
                List of your properties
            </div>
        </div>
        <>
            <UserPlaces listings={places}/>

        </>

    </>
    }
    </>
    }
    <div className="text-center mt-16">
        <Link to={'/account/places/new'} className="inline-flex gap-1 bg-brand text-white py-2 px-6 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new place
        </Link>
    </div>
    </>
  );
}
 
export default UserProperties;