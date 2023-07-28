import React from 'react'

const PreInput = ({header,description}) => {
  return (
    <>
        <h2 className="text-2xl">{header}</h2>
        <p className="text-gray-500 text-sm mb-1">{description}</p>
    </>
  )
}

export default PreInput