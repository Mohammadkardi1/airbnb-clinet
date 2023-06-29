import { useEffect, useState} from "react";
import {eachDayOfInterval } from "date-fns";
import { useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useForm } from "react-hook-form";
import { setUnavailableDates } from "../../redux/actions/PlaceActions";
import { useDispatch } from "react-redux";
import { addBooking } from "../../redux/actions/BookingActions";
import PageLoadingModel from "../Models/PageLoadingModel";





const BookingForm = ({place}) => {  
  const dispatch = useDispatch()
  const {register,  handleSubmit, formState: {errors}, reset} = useForm()
  const {user} = useSelector(state => state.auth)
  const {loading} = useSelector(state => state.booking)
  const [disabledDates, setDisabledDates] = useState([])
  const [numberOfNights, setNumberOfNights] = useState(0)
  const today = new Date()



  const currentDate = new Date();
  const initialDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  const [date, setDate] = useState([
      {
        startDate: initialDate,
        endDate: initialDate,
        key: "selection",
      },
    ])

  const setInitialDate = () => {
    const endDate = new Date(date[0].endDate)
    const isEndDateInDisabledArray = disabledDates?.some((date) => date.getTime() === endDate.getTime())
    if (isEndDateInDisabledArray) {
      const newDate = new Date(date[0].endDate)
      while (true) {
        newDate.setDate(newDate.getDate() + 1)
        const isNewDateInDisabledArray = disabledDates?.some((date) => date.getTime() === newDate.getTime())
        if (!isNewDateInDisabledArray) {
          setDate([{ ...date[0], startDate: newDate, endDate: newDate }])
          break
        }
      }
    }
  }



  useEffect( () => {
    setInitialDate()
  }, [disabledDates])

  useEffect( () => {
    setDisabledDates(place?.unavailableDates?.map(timestamp => new Date(parseInt(timestamp))))
  }, [place])

  useEffect(() => {
    if ( date[0].endDate !== null ) {
      setNumberOfNights(eachDayOfInterval({ start: date[0]?.startDate, end: date[0]?.endDate }).length)
    }
  }, [date[0].startDate, date[0].endDate])




  const dayContentRenderer = (day) => {
    const isDisabled  = disabledDates?.some(disabledDate => 
      today.toISOString().slice(0, 10) <= disabledDate.toISOString().slice(0, 10) &&
      disabledDate.getDate() === day.getDate() && 
      disabledDate.getMonth() === day.getMonth() && 
      disabledDate.getFullYear() === day.getFullYear()
    )
    const DayDisabledCustom = isDisabled  ? '!text-red-500  font-semibold' : ' font-semibold';
    return (
      <span className={DayDisabledCustom}>
        {day.getDate()}
      </span>
    )
  }





  const handleBookingPlace = async (data) => {
    const datesArray = eachDayOfInterval({ start: date[0].startDate, end: date[0].endDate })
    const timestampsArray = datesArray.map(date => date.getTime())
    const submitedData = {...data,
          price: place?.price * timestampsArray.length,
          numberOfNights: timestampsArray.length,
          user: user?._id, 
          place: place?._id,
          checkIn:date[0]?.startDate.getTime(), 
          checkOut:date[0]?.endDate.getTime()}
    try {
      await dispatch(addBooking(submitedData))
      await dispatch(setUnavailableDates({id: place?._id, timestamps: timestampsArray }))
      reset()
      setInitialDate()
    } catch (error) {
      console.log('something went error', error)
    }
  }



  const setNextDate = () => {
    const newDate = new Date(date[0].endDate)
    while (true) {
      newDate.setDate(newDate.getDate() + 1)
      const isNewDateInDisabledArray = disabledDates?.some((date) => date.getTime() === newDate.getTime())
      if (!isNewDateInDisabledArray) {
        setDate([{ ...date[0], startDate: newDate, endDate: newDate }])
        break
      }
    }
  }



  return (
    <> 
    <form 
      className="flex flex-col gap-4 bg-white shadow p-4 rounded-2xl"
      onSubmit={handleSubmit(handleBookingPlace)}>

      <div className="text-2xl text-center">
        Price: ${place?.price} / per night
      </div>


      <div className=" w-full z-10">
        <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            showSelectionPreview={true}
            className="date w-full"
            minDate={new Date()}
            disabledDates={disabledDates}
            dayContentRenderer={dayContentRenderer}
            />
      </div>

      <div className="flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${numberOfNights * place?.price}</div>
      </div>




      <div>
        <label>Number of guests</label>
        <input 
            type="text"
            {...register('guests', {
              required: 'Enter the number of guests',
              pattern: {
                value: /^\d+$/, 
                message: 'Enter a valid 10-digit phone number'
              },
              min: { 
                value: 0, 
                message: 'Guest number cannot be negative number' 
              },
              max: { 
                value: place?.maxGuests, 
                message: `Guest number must be less than or equal to ${place?.maxGuests}` }
            }
            )}
            defaultValue='0'
            />
        <p className={`text-red-600 ${errors.guests?.message ? "visible" : "invisible"}`}>
            {errors.guests?.message}.
        </p>
      </div>



      <div>
        <label>Your full name</label>
        <input 
            type="text"
            {...register('name', {
              required: 'Enter your name',
              minLength: {
                value: 4,
                message: "Name must be at least 4 characters long"
              },
              pattern: {
                  value: /^[a-zA-Z0-9\s]+$/,
                  message: "Name must be alphanumeric"
              }
            })}
            defaultValue={user?.username}
            />
        <p className={`text-red-600 ${errors.name?.message ? "visible" : "invisible"}`}>
            {errors.name?.message}.
        </p>
      </div>



      <div>
        <label>Phone number</label>
        <input 
            type="text"
            {...register('phone', {
              required: 'Enter your phone number',
              pattern: {
                value: /^\d{10}$/, 
                message: 'Enter a valid 10-digit phone number'
              }
            })}/>
        <p className={`text-red-600 ${errors.phone?.message ? 'visible': 'invisible'}`}>
          {errors.phone?.message}.
        </p>
      </div>



      <button className="primary w-full mt-4" disabled={loading}>
        {
            loading ? 
                <PageLoadingModel size={"2em"} padding={"0"} color={"#4a148c"}/>
            :
            <div>
            Book this place
            </div>
        }
      </button>




    </form>
    </>
  );
}

export default BookingForm