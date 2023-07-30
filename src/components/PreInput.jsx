import React from 'react'

const PreInput = ({header,description}) => {
  return (
    <>
        <h2 className="text-[1.1rem] lg:text-[1.2rem]">{header}</h2>
        <p className="text-gray-500 text-[0.8rem] lg:text-[1rem] mb-1">{description}</p>
    </>
  )
}

export default PreInput