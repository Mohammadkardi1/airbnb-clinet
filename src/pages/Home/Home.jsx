import { useDispatch, useSelector } from "react-redux";
import ListingPlaceCard from "../../components/Listings/ListingPlaceCard";
import PageLoadingModel from "../../components/Models/PageLoadingModel";
import { useEffect, useState } from "react";
import { getAllPlaces } from "../../redux/actions/PlaceActions";
import { useSearchParams } from 'react-router-dom'; 
import {categories_items} from '../../assets/data/DataItems'
import EmptyState from "../../components/EmptyState";


const Home = () => {
  const dispatch = useDispatch()
  const {loading, places}  = useSelector((state) => state.place)
  const [displayedPlaces, setDisplayedPlaces] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || "All"




  useEffect( () => {
    try {
     dispatch(getAllPlaces())
    } catch (error) {
      console.log(error)
    }
  }, [])


  useEffect(() => {
    if (activeCategory === 'All') {
      setDisplayedPlaces(places)
    } else {
      setDisplayedPlaces(places.filter(place => place.category === activeCategory))
    }
  }, [places])



  const filterPlacesByCategory  = (label) => {
    setSearchParams({ category: label})
    if (label === 'All') {
      setDisplayedPlaces(places)
    } else {
      setDisplayedPlaces(places.filter(place => place.category === label))
    }
    
  }


  return (
    <>
      <div className="pt-4 flex flex-row items-center justify-between   
      overflow-x-auto scrollbar">
        {categories_items.map((item, index) => (        
          <div key={index} onClick={() => filterPlacesByCategory(item.label)}
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2
                  hover:text-brand transition cursor-pointer plain-text
                  ${activeCategory === item.label ? 'text-brand border-b-brand ' : 'text-neutral-500 border-transparent'}`}>
            {item.icon}
            <p className="font-medium">
              {item.label}
            </p>
          </div>
        ))}
      </div>
      
      {
        loading  ?
        <PageLoadingModel isFixed={false}/>
      :
      <>
      {
      displayedPlaces?.length === 0 ? 
        <EmptyState  
          title={'No exact matches'} 
          subtitle={'Try changing or removing some of your filters.'} />
        :
        <div className="mt-8 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-x-6 gap-y-8">
          {displayedPlaces?.map((place, index) => (
            <ListingPlaceCard key={index} listing={place}/>
          ))}
        </div>
      }
      </>
      }
    </>
  );
}

export default Home