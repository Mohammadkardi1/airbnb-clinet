import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../redux/slices/AuthSlice";
import { useEffect, useState } from "react";
import Avatar from "../Avatar";
import { useNavigate } from "react-router-dom";

const menu_items = [
    {
        path: 'profile', 
        displayName: 'My profile'
    },
    {
        path: 'trips', 
        displayName: 'My trips'
    },
    {
        path: 'favorites', 
        displayName: 'My favorites'
    },
    {
        path: 'bookings', 
        displayName: 'My bookings'
    },
    {
        path: 'properties', 
        displayName: 'My properties'
    },
    {
        path: 'places/new', 
        displayName: 'Add new place'
    },
]

const UserMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.auth)
    const [isOpen, setIsOpen] = useState(false);

    const logout = async () => {
        try {
            await dispatch(AuthActions.logout())
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
      }


    const handleClickOutside = (event) => {
        const model = document.querySelector(".userMenuModel");
        if (!model.contains(event.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])



  return (
    <>
    <div 
        className="userMenuModel flex items-center gap-2 border border-gray-300 
            rounded-full py-2 px-4 cursor-pointer hover:bg-gray-300 transition"
        onClick={() => setIsOpen(!isOpen)}>
        <div className={`${Object.keys(user).length === 0  ? "hidden" : "flex items-center gap-2"}`}>
            <Avatar src={user?.picture} alt={user?.username} />

            {user && (
                <p className="plain-text ">
                {user.username?.split(' ')[0]}
                </p>
            )}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg> 
    </div>
    {isOpen && (
        <div className="absolute z-20 rounded-xl shadow-md w-[150px] lg:w-[200px]  bg-white 
            overflow-hidden right-24 top-20 plain-text">
          <div className="flex flex-col cursor-pointer">
            {user?.username ? (
              <>
              {
                menu_items.map((item, index) => (
                    <Link key={index} to={`/account/${item.path}`}
                        className="px-4 py-2 lg:py-3 hover:bg-neutral-200 transition-colors">
                        {item.displayName}
                    </Link>
                ))
              }
                <hr />
                <div className="px-4 py-3 hover:bg-neutral-200 transition"
                    onClick={logout}>
                    Logout
                </div>
              </>
            ) : (
              <>
                <Link to='/login' className="px-4 py-3 hover:bg-neutral-200 transition">
                    Login
                </Link>
                <Link to='/register' className="px-4 py-3 hover:bg-neutral-200 transition">
                    Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default UserMenu