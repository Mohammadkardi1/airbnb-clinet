import ListingBookingCard from "../../components/Listings/ListingBookingCard";



const UserBookings = ({listings,currentUser}) => {

  

  // const dispatch = useDispatch()
  // const {  clientBookings, loading } = useSelector(state => state.booking)

  // useEffect(() => {
  //   dispatch(getUserBookings())
  // }, [])


  

  return (
    <>
      <div 
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((listing) => (
          <ListingBookingCard
            key={listing?._id}
            listing={listing}
            // actionId={listing.id}
            // onAction={onDelete}
            // disabled={deletingId === listing.id}
            // actionLabel="Delete property"
            // currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
}

export default UserBookings