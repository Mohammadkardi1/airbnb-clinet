import React, { useEffect } from 'react'

const GalleryOverlay = ({place, setShowAllPhotos}) => {

    useEffect(() => {
        window.scrollTo(0, 0);
        }, [])


    return (
        <>
        {place &&
        <div className="absolute inset-0 z-20 pt-24 px-4 md:px-0 bg-black text-white w-full">
            <div className='flex flex-col items-center bg-black pb-8'>
                <div className=" space-y-4">
                    <h2 className="text-left text-xl lg:text-3xl text-neutral-100">
                        {place?.title}
                    </h2>
                    {place?.photos.length > 0 && place?.photos.map((photo, index) => (
                        <img key={index} src={photo.url} alt="" className=" w-full"/>

                    ))}
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(false)} className="absolute right-6 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
        }
        </>
    )
}

export default GalleryOverlay