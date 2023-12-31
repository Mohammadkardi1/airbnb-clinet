import React from 'react'
import StarRateIcon from '@mui/icons-material/StarRate';
import { Avatar } from '@mui/material';




const ListingReview = ({review}) => {

    const ratingInt = parseInt(review?.rating)
    const starIcons = []

    for (let i = 0; i < ratingInt; i++) {
      starIcons.push(<StarRateIcon key={i} />);
    }


  return (
    <div className="grid  gap-4"  style={{gridTemplateColumns: '40px auto'}}>
        <div className=" flex justify-center items-center">
            <Avatar src={review?.user?.picture} alt={review?.user?.username} />
        </div>
        <div className='plain-text'>
            <h6 className='text-[0.8rem] lg:text-[1rem] font-semibold'>
                {review?.user?.username}
            </h6>
            <div className='flex items-center gap-1  font-semibold text-orange-600'>
                {starIcons}
            </div>
        </div>
        <div></div>
        <p className='plain-text'>
            {review?.comment}
        </p>
    </div>
  )
}

export default ListingReview