import React, { useRef, useState } from 'react'
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useDispatch } from 'react-redux';
import { reviewPlace } from '../../redux/actions/PlaceActions';



const ReviewForm = ({placeID}) => {
    const dispatch = useDispatch()
    const rates = [1, 2, 3, 4, 5]
    const [rateValue, setRateValue ] = useState(1)

    // const [rating, setRating] = useState(null)

    const reviewMsg = useRef('')



    const submithandler = async (e) => {
        e.preventDefault()
        const review = {
            comment: reviewMsg.current.value,
            rating: rateValue,
        }
        console.log({ id : placeID, review})
        try {
            await dispatch(reviewPlace({ id : placeID, review}))
        } catch (error) {
            console.log(error)
        }
        // reviewMsg.current.value = ''
        // setRateValue(0)
    }
  return (
    <form className='mt-12 space-y-4' action="" onSubmit={submithandler}>
        <h2 className="font-semibold text-xl mb-4">Leave your experience</h2>
        <div className="flex items-center gap-5">
            {rates.map((item, index) => (
                <div key={index} className=" relative hover:opacity-80 transition cursor-pointer"
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