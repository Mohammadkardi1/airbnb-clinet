import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
import { getFavoritePlaces } from '../../redux/actions/PlaceActions'
import UserFavorites from './UserFavorites'


const Favorites = () => {

  const dispatch = useDispatch()
  const {loading, places} = useSelector(state => state.place)

  useEffect(() => {
    dispatch(getFavoritePlaces())
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
              title={'No favorites found'} 
              subtitle={'Looks like you have no favorites listings.'} />
      :
      <>
          {/* <div className=" space-y-4 mt-4">
          { places.map((place, index) => (
              <ListingUserPlace  key={index} place={place}/>
          ))}
          </div> */}
          <div className="text-start mb-8">
              <div className="text-2xl font-bold">
                Favorites
              </div>
              <div className="font-light text-neutral-500 mt-2">
                  List of places you have favorite
              </div>
          </div>
          <>
              <UserFavorites listings={places}/>
  
          </>
  
      </>
      }
      </>
      }
      </>
  )
}

export default Favorites