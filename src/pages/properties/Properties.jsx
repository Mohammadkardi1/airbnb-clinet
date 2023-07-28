import {Link} from "react-router-dom"
import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import PageLoadingModel from "../../components/Models/PageLoadingModel"
import EmptyState from "../../components/EmptyState"
import { getUserplaces } from "../../redux/actions/PlaceActions"
import UserPlaces from "./UserProperties"
import SectionTitle from "../../components/SectionTitle"
// import PropertiesClient from "./PropertiesClient"


const UserProperties =  () => {
    const dispatch = useDispatch()
    const {loading, places} = useSelector(state => state.place)
    


    console.log(places)
  
    useEffect(() => {
      dispatch(getUserplaces())
    }, [])

    const clickHandler = () => {
        console.log(!places)
    }

  return (
    <>
    <div onClick={clickHandler}>
        Click here
    </div>
    {
    loading ?
        <PageLoadingModel isFixed={false}/>
    :
    <>
    {places.length === 0 ?
        <EmptyState  
            title={'No properties found'} 
            subtitle={'Looks like you have no properties.'} />
    :
    <>
        <SectionTitle
          title={'Properties'}
          secondaryText={'List of your properties'}
        />

        <UserPlaces listings={places}/>
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