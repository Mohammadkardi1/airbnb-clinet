import  Avatar  from '../../components/Avatar';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthActions } from '../../redux/slices/AuthSlice'


const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userplaces, setUserplaces] = useState()
    const [userBookings, setUserBookings] = useState()

    const { user } = useSelector(state => state.auth)
    const { places } = useSelector(state => state.place)
    const { bookings } = useSelector(state => state.booking)


    


    useEffect(() => {
        setUserBookings(bookings.filter(booking => booking.user === user._id))
        setUserplaces(places.filter(place => place.owner === user._id))

      }, [bookings])
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
                <Avatar src={user?.picture} altText={user?.username} height={"100px"} />
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
                <p>NO. your places:</p>
                <p>{userplaces?.length}</p>
            </div>

            <div className='flex justify-between'>
                <p>NO. your bookings:</p>
                <p>{userBookings?.length}</p>
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