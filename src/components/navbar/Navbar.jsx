import {Link, useLocation} from "react-router-dom";
import Container from '../Container'
import UserMenu from "./UserMenu";
import { useDispatch } from "react-redux";
import { getPlacesBySearch } from "../../redux/actions/PlaceActions";
import { useRef } from "react";

const Navbar = () => {

  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const location = useLocation()


  const filterPlacesBySearch = async () => {
    try {
      await dispatch(getPlacesBySearch(inputRef.current.value))
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      filterPlacesBySearch()
    }
    }

  return (
    <>
    <div className="w-full bg-white shadow-sm  border-b-[1px]">
      <Container>
        <div className="flex justify-between py-4 lg:py-6 h-[83px] lg:h-[100px]">
          <Link to='/home' className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 lg:w-8 lg:h-8 -rotate-90 text-brand">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            <span className="font-semibold text-[1.3rem] lg:text-[1.9rem] text-brand">airbnb</span>
          </Link>
          {
            location.pathname.startsWith('/home')  &&
          <div 
            className="hidden lg:flex gap-1 w-[30rem] xl:w-[40rem] 2xl:w-[50rem] border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300"
            onKeyDown={handleKeyPress}>

              <input 
                type="text" 
                className="bg-transparent p-0 " 
                style={{borderWidth:'0', padding:'0 0.5rem'}}
                ref={inputRef}/>
              <button 
                className="flex justify-center items-center bg-brand p-3 text-white rounded-full"
                onClick={filterPlacesBySearch}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
          </div>
          }
          <UserMenu/>
        </div>
      </Container>
    </div>
    </>
  );
}

export default Navbar