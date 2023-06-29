import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removePlace } from '../../redux/actions/PlaceActions'


const ListingUserPlace = ({place}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const navigateHandler = (id) => {
        // to={`/place/${place._id}`}
        navigate(`/place/${id}`)
    
        // console.log('navigateHandler', id)
      }


    const removePlaceHandler = async (event, id) => {
        event.stopPropagation()
        try {
          await dispatch(removePlace(id))
        } catch (error) {
          console.log('something went wrong')
        }
      }

    const editPlaceHandler = (event, id) => {
        event.stopPropagation()

        console.log('editPlaceHandler', id)
        }


    return (
        <>
        {place &&

            <div onClick={() => navigateHandler(place?._id)} 
                className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl shadow-md shadow-gray-300">
            

                <div className="flex">
                    <img 
                        className="w-32 h-32 object-cover rounded-lg " 
                        src={place?.photos[0]?.url} alt='error' />
                </div>


            
                <div className="w-full flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <h2 className="text-xl font-semibold">{place?.title}</h2>
                            <p className="font-light text-black">
                                {`${place?.location?.region}, ${place?.location?.label}`}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex items-center gap-1 text-lg text-blue-600"  onClick={(event) => editPlaceHandler(event, place._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                Edit
                            </button>


                            <button className="flex items-center gap-1 text-lg text-red-600"  onClick={(event) => removePlaceHandler(event, place._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                    <p className="text-sm mt-2">
                        {place?.description.slice(0,250)}
                        {place?.description.length > 200 ? "..." : null}
                    </p>
                </div>
            </div>
        }
        </>
    )
}

export default ListingUserPlace