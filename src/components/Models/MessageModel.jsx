import React from 'react'
import { AiOutlineClose } from "react-icons/ai";


export const MessageModel = ({isModelOpen, setIsModelOpen, message}) => {


  return (
    <>
    {isModelOpen && 
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20'>
        <div className='w-[500px] bg-white rounded-lg py-4 px-6 space-y-4'>
          <div className='flex justify-end mb-4 text-2xl'>
            <AiOutlineClose onClick={() => setIsModelOpen(!isModelOpen)} className='cursor-pointer text-end'/>
          </div>
          <div className='flex items-center text-[1.5rem]'>
            {message}
          </div>
          <div className='text-end '>
            <button 
              className=' primary px-6'
              onClick={() => setIsModelOpen(!isModelOpen)}>
              Close
            </button>
          </div>
        </div>
      </div>
      }
    </>
  )
}