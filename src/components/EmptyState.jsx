

const EmptyState = ({
  title = "No places founded",
  subtitle = "Something went wrong. Try again please!",
  ButtonLabel = "Reload",
  showReset
}) => {

    
  return ( 
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center ">

        <div className='text-center'>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="font-light text-lg  text-neutral-500 mt-2">{subtitle}</p>
        </div>

        <div className="mt-4 ">
            {showReset && (
            <button className="primary px-8 py-4"
                // label="Remove all filters"
                // onClick={() => router.push('/')}
            >{ButtonLabel} </button>
            )}
      </div>
    </div>
   );
}
 
export default EmptyState;