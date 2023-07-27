import  Avatar  from '../../components/Avatar';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthActions } from '../../redux/slices/AuthSlice'
import { getUserplaces } from '../../redux/actions/PlaceActions';
import { getBookingsOnProperties } from '../../redux/actions/BookingActions';


const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [userplaces, setUserplaces] = useState()
    // const [userBookings, setUserBookings] = useState()

    const { user } = useSelector(state => state.auth)
    const { places } = useSelector(state => state.place)
    const { bookings } = useSelector(state => state.booking)


    


    useEffect(() => {
        // setUserBookings(bookings?.filter(booking => booking.user === user._id))
        // setUserplaces(places?.filter(place => place.owner._id === user._id))

        dispatch(getUserplaces())
        dispatch(getBookingsOnProperties())

      }, [])




    const logout = async () => {
        try {
            await dispatch(AuthActions.logout())
            navigate('/home')
        } catch (error) {
            console.log(error)
        }

      }


  return (
    <div className="flex justify-center ">
        <div className='w-[600px] space-y-4 text-base border-2 border-black rounded-lg p-4'>

            <div className='flex justify-center'>
                <Avatar src={user?.picture} alt= {user?.username} height={"100px"} />
            </div>

            <div className='flex justify-between'>
                <p>Username:</p>
                <p>{user?.username}</p>
            </div>

            <div className='flex justify-between'>
                <p>Email:</p>
                <p>{user?.email}</p>
            </div>

            <div className='flex justify-between'>
                <p>NO. your properties:</p>
                <p>{places?.length}</p>
            </div>

            <div className='flex justify-between'>
                <p>NO. Bookings on your own properties:</p>
                <p>{bookings?.length}</p>
            </div>

            <div className='pt-8 space-y-4'>
                <button className='block'>
                    Change Password
                </button> 

                <button className='block'>
                    Logout
                </button> 
            </div>
            

        </div>



        {/* <p>
            Logged in as {user?.username} ({user?.email})
        </p>
        <button onClick={logout} className="primary !py-3 px-8">
            Logout
        </button> */}
    </div>
  )
}

export default Profile