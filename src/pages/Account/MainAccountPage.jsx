import {Link, useLocation, Outlet} from "react-router-dom";


const header_items = [
  {
    name: 'profile', 
    d: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    displayName: 'My profile'
  },
  {
    name: 'bookings', 
    d: 'M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
    displayName: 'Bookings'
  },
  {
    name: 'properties', 
    d: 'M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819',
    displayName: 'My properties'
  },
  {
    name: 'trips', 
    d: 'M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z',
    displayName: 'My trips'
  },
  {
    name: 'favorites', 
    d: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
    displayName: 'My favorites'
  },
]



const MainAccountPage = () => {

  const {pathname} = useLocation();
  let subpage = pathname.split('/')?.[2];


  const linkClasses = (type=null) => {
    let classes = 'inline-flex items-center gap-1 py-2 px-4 lg:px-6 rounded-full '
    if (type === subpage) {
      classes += ' bg-brand text-white'
    } else {
      classes += ' bg-gray-200'
    }
    return classes
  }


  return (
    <>
      <div className="plain-text w-full flex flex-wrap justify-center mt-8 gap-2 mb-8">
        {
          header_items.map((item, index) => (
            <Link key={index} className={linkClasses(item.name)} to={`/account/${item.name}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.d} />
              </svg>
              {item.displayName}
            </Link>
          ))
        }
      </div>
      <Outlet/>
    </>
  );
}

export default MainAccountPage