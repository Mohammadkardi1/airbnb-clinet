import { useDispatch, useSelector } from "react-redux";
import ListingPlaceCard from "../../components/Listings/ListingPlaceCard";
import PageLoadingModel from "../../components/Models/PageLoadingModel";
import { useEffect, useState } from "react";
import { getAllPlaces } from "../../redux/actions/PlaceActions";
import { useParams, useSearchParams } from 'react-router-dom'; 
import {categories_items} from '../../assets/data/DataItems'
import EmptyState from "../../components/EmptyState";


const Home = () => {
  const dispatch = useDispatch()

  const {loading, places}  = useSelector((state) => state.place)

  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [searchParams, setSearchParams] = useSearchParams()
  const { category } = useParams()

  const activeCategory = searchParams.get('category') || "All"


  console.log('places', places)

  useEffect(() => {
    console.log("Home component is ran")
    try {
      dispatch(getAllPlaces())
    } catch (error) {
      console.log(error)
    }
  }, [])





  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredPlaces(places)
    } else {
      setFilteredPlaces(places.filter(place => place.category === activeCategory))
    }
  }, [places])






  const handleClick = (label) => {
    setSearchParams({ category: label})
    if (label === 'All') {
      setFilteredPlaces(places)
    } else {
      setFilteredPlaces(places.filter(place => place.category === label))
    }
    
  }


  return (
    <>
      <div className="pt-4 flex flex-row items-center justify-between   
      overflow-x-auto scrollbar">
        {categories_items.map((item, index) => (        
          <div key={index} onClick={() => handleClick(item.label)}
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2
                  hover:text-neutral-800 transition cursor-pointer
                  ${activeCategory === item.label ? 'text-neutral-800 border-b-neutral-800 ' : 'text-neutral-500 border-transparent'}`}>
            {item.icon}
            <div className="font-medium text-sm">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      
      {
        loading  ?
        <PageLoadingModel/>
      :
      <>
      {
      filteredPlaces?.length === 0 ? 
        <EmptyState  title={'No exact matches'} subtitle={'Try changing or removing some of your filters.'} />
        :
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {filteredPlaces?.map((place, index) => (
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