import React from 'react'
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';



const PageLoadingModel = ({size = "7em", padding = "py-36", color= "#2196f3", isFixed= true}) => {

  return (
    <>
      <div className={`${isFixed ? "fixed inset-0" : ""} flex items-center justify-center ${padding}`}>
            <CircularProgress size={size} style={{ color: color }}/>
      </div>
    </>
  )
}

export default PageLoadingModel