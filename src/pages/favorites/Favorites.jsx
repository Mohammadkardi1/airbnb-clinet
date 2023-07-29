import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
import SectionTitle from '../../components/SectionTitle'
import { getFavoritePlaces } from '../../redux/actions/PlaceActions'
import UserFavorites from './UserFavorites'


const Favorites = () => {

  const dispatch = useDispatch()
  const {loading, places, placeError} = useSelector(state => state.place)

  useEffect( async () => {
    await dispatch(getFavoritePlaces())
  }, [])


  if (loading) {
    return <PageLoadingModel isFixed={false}/>
  }

  if (placeError) {
    return <div>Error: {placeError}</div>
  }

  if (places.length === 0) {
    return (
      <EmptyState  
        title={'No favorites found'} 
        subtitle={'Looks like you have no favorites listings.'} />
    );
  }

  return (
      <>
        <SectionTitle
            title={'Favorites'}
            secondaryText={'List of places you have favorite'}
          />
          <UserFavorites listings={places}/>
      </>
  )
}

export default Favorites