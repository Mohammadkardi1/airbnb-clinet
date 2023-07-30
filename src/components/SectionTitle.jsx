import React from 'react'

const SectionTitle = ({title, secondaryText}) => {
  return (
    <div className="text-start mb-8">
        <h1 className="font-bold text-[1.3rem] lg:text-[1.5rem]">
            {title}
        </h1>
        <p className="font-light text-neutral-500 mt-2 text-[0.9rem] lg:text-[1.1rem]">
            {secondaryText}
        </p>
    </div>
  )
}

export default SectionTitle