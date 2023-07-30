import React from 'react'

const SectionTitle = ({title, secondaryText}) => {
  return (
    <div className="text-start mb-8">
        <div className="text-[1.4rem] font-bold lg:text-[1.7rem]">
            {title}
        </div>
        <div className="font-light text-neutral-500 mt-2 lg:text-[1.5rem]">
            {secondaryText}
        </div>
    </div>
  )
}

export default SectionTitle