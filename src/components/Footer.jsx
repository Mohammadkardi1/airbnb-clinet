import React from 'react'
import { useSelector } from 'react-redux'


const Footer = () => {


    const { places } = useSelector(state => state.place)
  
  const clickHandler = () => {
    console.log(places)
  }

  


  return (
      <div className='flex  gap-10 mt-20'>


        <button onClick={clickHandler}>
          Display - Places 
        </button>

    </div>
  )
}

export default Footer