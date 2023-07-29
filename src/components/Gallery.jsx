import {useEffect, useState} from "react";
// import Image from "./Image.jsx";
import HeartButton from './HeartButton'
import GalleryOverlay from "./GalleryOverlay";
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import {RxDotFilled} from 'react-icons/rx'
import {PiDotOutlineDuotone} from 'react-icons/pi'

const Gallery = ({place}) => {

  const [showAllPhotos,setShowAllPhotos] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  console.log('place', place)



  // const [value, setValue] = useState(0)
  // const {mainImage} = products[value]



  if (showAllPhotos) {
    return <GalleryOverlay place={place} setShowAllPhotos={setShowAllPhotos}/>
  } 


  const prevSlide = () => {
    const newIndex = (currentIndex + place?.photos?.length - 1) % place?.photos?.length
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % place?.photos?.length
    setCurrentIndex(newIndex)
  }

  return (
    <>
    {place &&
    <div className="h-[780px] w-full m-auto relative group">
      <div style={{backgroundImage: `url(${place?.photos[currentIndex]?.url})`}}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500">
        
      </div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl
               rounded-full p-2 bg-black/50  text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30}/>
      </div>


      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl
               rounded-full p-2 bg-black/50  text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30}/>
      </div>


      {place?.photos?.length > 1 &&
      <div className="w-full flex justify-center absolute text-gray-200 bottom-5">
        {place?.photos?.map((photo, index) => (
          <div key={index} onClick={() => setCurrentIndex(index)} className='text-2xl cursor-pointer'>
            {
              currentIndex === index ? 
                <RxDotFilled size={40}/>
              :
                <PiDotOutlineDuotone size={40}/>
            }
          </div>
        ))}
      </div>
    }



        <div className="absolute top-5 right-5">
         <HeartButton
           listingId={place?._id}
           favorites = {place?.favorites}
         />
       </div>
       <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute top-2 left-2 p-[10px] bg-white rounded-2xl shadow-md shadow-gray-500">
         <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
           <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
         </svg>
         Show all photos
       </button>


    </div>
    }
    </>
  );
}

export default Gallery



{/* <img 
className='object-cover rounded-lg mb-4 w-[100%] h-[60vh]' 
src={place?.photos?.[value].url} alt="" />
<div className='grid grid-cols-4 gap-3'>
  {place?.photos?.map((item, index) => {
      return (
        index < 4 &&
          <div key={index} onClick={() => setValue(index)} 
              className={`h-[180px] w-full rounded-lg overflow-hidden cursor-pointer ${value === index && " border-orange-400 "}` }
                >
              <img    src={item.url}
                      className= {`object-cover h-full w-full ${value === index && "opacity-40 "}  max-w-[100%] `} 
                      alt="" />
          </div>
      )
  })}
</div> */}