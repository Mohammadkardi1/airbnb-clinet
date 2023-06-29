import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// import useFavorite from "@/app/hooks/useFavorite";
// import { SafeUser } from "@/app/types";

// import ClientOnly from "./ClientOnly";
import { useState } from "react";

// interface HeartButtonProps {
//   listingId: string
//   currentUser?: SafeUser | null
// }

const HeartButton = ({ listingId, currentUser}) => {


  // const { hasFavorited, toggleFavorite } = useFavorite({ listingId, currentUser});

  const [favorite, setFavorite ] = useState(false)

  return (
    <div 
      // onClick={toggleFavorite}
      onClick={() => setFavorite(!favorite)}
      className="relative hover:opacity-80 transition cursor-pointer">

      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"/>
        
      <AiFillHeart
        size={24}
        // className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
        className={favorite ? 'fill-rose-500' : 'fill-neutral-500/70'}
        />

    </div>
   );
}
 
export default HeartButton;