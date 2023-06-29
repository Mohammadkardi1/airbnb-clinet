import React from 'react'
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';



const PageLoadingModel = ({size = "7em", padding = "py-36", color= "#2196f3"}) => {

  return (
    <>
      <div className={`flex items-center justify-center ${padding}`}>
            <CircularProgress size={size} style={{ color: color }}/>
      </div>
    </>
  )
}

export default PageLoadingModel