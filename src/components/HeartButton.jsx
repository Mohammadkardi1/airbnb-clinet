import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { favoritePlace } from "../redux/actions/PlaceActions";
import PageLoadingModel from "./Models/PageLoadingModel";


const HeartButton = ({ listingId, favorites}) => {
  const dispatch = useDispatch()

  const currentUser = JSON.parse(localStorage.getItem('profile'))?._id

  


  const favoriteHandler = async () => {
    try {
      await dispatch(favoritePlace(listingId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div 
      onClick={favoriteHandler}
      className="relative hover:opacity-80 transition cursor-pointer">

      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"/>
        
      <AiFillHeart
        size={24}
        className={favorites?.includes(currentUser) ? 'fill-rose-500' : 'fill-neutral-500/70'}
        />
    </div>
   );
}
 
export default HeartButton;