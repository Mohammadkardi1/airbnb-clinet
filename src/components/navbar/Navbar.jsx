import {Link} from "react-router-dom";
import Container from '../Container'
import UserMenu from "./UserMenu";

const Navbar = () => {


  return (
    <>
    <div className="w-full bg-white shadow-sm  border-b-[1px]">
      <Container>
        <div className="flex justify-between py-6">

        
          <Link to='/home' className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90 text-brand">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            <span className=" font-semibold text-3xl text-brand">airbnb</span>
          </Link>



          <div className="flex gap-6 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
            
            
            <div className="cursor-pointer p-2 hover:bg-gray-300 hover:rounded-full">
              Anywhere
            </div>



            <div className="cursor-pointer p-2 hover:bg-gray-300 hover:rounded-full">
              Any week
            </div>



            <div className="cursor-pointer p-2 hover:bg-gray-300 hover:rounded-full">
              Add guests
            </div>

            <button className="bg-brand p-3 text-white rounded-full ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>


          </div>


          <UserMenu/>
          
        </div>
        
      </Container>
    </div>
    </>

  );
}

export default Navbar