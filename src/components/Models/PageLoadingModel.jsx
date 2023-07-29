import React from 'react'
import { CircularProgress } from '@mui/material';


const PageLoadingModel = ({ padding = "py-36", color= "#2196f3", isFixed= true}) => {

  return (
    <>
      <div className={`${isFixed ? "fixed inset-0 z-20 " : ""} flex items-center justify-center  ${padding}`}>
        <div className='w-[4rem] md:w-[7rem]'>
            <CircularProgress className='' style={{ color: color, width: '100%', height: '100%' }}/>
        </div>
      </div>
    </>
  )
}

export default PageLoadingModel