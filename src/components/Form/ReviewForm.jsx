import React, { useRef, useState } from 'react'
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { reviewPlace } from '../../redux/actions/PlaceActions';
import { MessageModel } from '../Models/MessageModel';
import PageLoadingModel from '../Models/PageLoadingModel';



const ReviewForm = ({placeID}) => {
    const dispatch = useDispatch()
    const rates = [1, 2, 3, 4, 5]
    const [rateValue, setRateValue ] = useState(1)
    const [isModelOpen, setIsModelOpen] = useState(false)

    // const [rating, setRating] = useState(null)

    const reviewMsg = useRef('')

    const {placeReviewing} = useSelector(state => state.place)



    const submithandler = async (e) => {
        e.preventDefault()
        if (!JSON.parse(localStorage.getItem('profile'))?._id ) {
            setIsModelOpen(true)
          } else {
            const review = {
                comment: reviewMsg.current.value,
                rating: rateValue,
            }
            try {
                await dispatch(reviewPlace({ placeID, review}))
            } catch (error) {
                console.log(error)
            }
            reviewMsg.current.value = ''
            setRateValue(1)
        }
    }
  return (
    <>
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





            <button className="primary px-8 py-4" type='submit' disabled={placeReviewing}>
                {
                    placeReviewing ? 
                        <PageLoadingModel isFixed={false} size={"1.7em"} padding={"px-4"} color={"#fff"}/>
                    :
                    <div>

                    Submit
                    </div>
                }
            </button>


        </form>


        <MessageModel
            isModelOpen={isModelOpen} 
            setIsModelOpen={setIsModelOpen} 
            message="Please login."
            />
    </>
    
  )
}

export default ReviewForm