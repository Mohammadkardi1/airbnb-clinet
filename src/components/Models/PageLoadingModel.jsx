import React from 'react'
import { CircularProgress } from '@mui/material';


const PageLoadingModel = ({size="7rem", padding = "py-36", color= "#2196f3", isFixed= true}) => {

  return (
    <>
      <div className={`${isFixed ? "fixed inset-0 z-20 " : ""} flex items-center justify-center  ${padding}`}>
            <CircularProgress size={size} style={{ color: color }}/>
      </div>
    </>
  )
}

export default PageLoadingModel