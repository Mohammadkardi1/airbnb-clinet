import React, { useRef, useState } from 'react'
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';


import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';




const ReviewForm = () => {
    const rates = [1, 2, 3, 4, 5]
    const [rateValue, setRateValue ] = useState(null)

    // const [rating, setRating] = useState(null)

    const reviewMsg = useRef('')



    const submithandler = (e) => {
        e.preventDefault()
        const data = {
            // username: 
            message: reviewMsg.current.value,
            rating: rateValue,
            // photo
        }

        console.log(data)

        // reviewMsg.current.value = ''
        // setRateValue(null)
    }
  return (
    <form className='mt-12 space-y-4' action="" onSubmit={submithandler}>
        <h2 className="font-semibold text-xl mb-4">Leave your experience</h2>
        <div className="flex items-center gap-5">
            {rates.map(item => (
                <div className=" relative hover:opacity-80 transition cursor-pointer"
                    onClick={() => setRateValue(item)}>
                    <StarBorderOutlinedIcon
                        size={28}
                        className="text-neutral-500/70 absolute top-[1px] right-[0px]"/>
                    <StarRateIcon
                        size={24}
                        className={item <= rateValue  ? 'text-orange-600' : 'text-white'}/>
                </div>
                ))
            }


        </div>




        <div>
            <textarea 
                rows={4} 
                type="text" 
                placeholder='Review Message...'
                ref={reviewMsg}
                required/>
        </div>





        <button
            className="primary px-8"
            type='submit'>
            Submit
        </button>


    </form>
  )
}

export default ReviewForm