import  Avatar  from '../../components/Avatar';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthActions } from '../../redux/slices/AuthSlice'
import { getUserplaces } from '../../redux/actions/PlaceActions';
import { getBookingsOnProperties } from '../../redux/actions/BookingActions';





const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const { places } = useSelector(state => state.place)
    const { futureBookings, pastBookings } = useSelector(state => state.booking)


    


    useEffect( async () => {
        await dispatch(getUserplaces())
        await dispatch(getBookingsOnProperties())

      }, [])




    const logout = async () => {
        try {
            await dispatch(AuthActions.logout())
            navigate('/home')
        } catch (error) {
            console.log(error)
        }

      }

      const listInfo = ({title, info}) => {
        return (
            <div>
                <p className='text-xl font-bold'>{title}</p>
                <p className='text-lg'>{info}</p>
            </div>
        )
    }

  return (
    <div className="flex justify-center ">
        <div className='w-[600px] space-y-8 text-base rounded-lg p-4'>
            <div className='flex justify-center'>
                <Avatar src={user?.picture} alt= {user?.username} height={"100px"} />
            </div>

            {listInfo({ title: 'Username', info: user?.username })}
            {listInfo({ title: 'Email', info: user?.email })}
            {listInfo({ title: 'NO. your properties', info: places?.length })} 
            {listInfo({ title: 'NO. Bookings on your own properties', info: futureBookings?.length + pastBookings?.length })}

            <div className='flex justify-center pt-8'>
                <button className='primary px-2 py-3 text-xl font-bold' onClick={logout}>
                    Logout
                </button> 
            </div>
        </div>
    </div>
  )
}

export default Profile