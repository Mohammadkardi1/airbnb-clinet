import React from 'react'
import { perk_items } from '../../assets/data/DataItems'


const ListingPerks = ({name}) => {


  const perk = perk_items.find(perk => perk.name === name)

  return (
    <>
    {name && perk &&
      <div className="flex flex-row items-center gap-4 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d={perk?.d} />
          </svg>
          <p className="text-neutral-500 plain-text font-medium">{perk?.displayName}</p>
      </div>
    }
    </>
  )
}

export default ListingPerks