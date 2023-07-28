import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import EmptyState from '../../components/EmptyState'
import PageLoadingModel from '../../components/Models/PageLoadingModel'
import SectionTitle from '../../components/SectionTitle'
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
          <PageLoadingModel isFixed={false}/>
      :
      <>
      {places.length === 0 ?
          <EmptyState  
              title={'No favorites found'} 
              subtitle={'Looks like you have no favorites listings.'} />
      :
      <>
        <SectionTitle
            title={'Favorites'}
            secondaryText={'List of places you have favorite'}
          />

          <UserFavorites listings={places}/>
      </>
      }
      </>
      }
      </>
  )
}

export default Favorites