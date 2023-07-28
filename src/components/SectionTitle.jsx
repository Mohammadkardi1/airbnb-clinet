import React from 'react'

const SectionTitle = ({title, secondaryText}) => {
  return (
    <div className="text-start mb-8">
        <div className="text-2xl font-bold">
            {title}
        </div>
        <div className="font-light text-neutral-500 mt-2">
            {secondaryText}
        </div>
    </div>
  )
}

export default SectionTitle