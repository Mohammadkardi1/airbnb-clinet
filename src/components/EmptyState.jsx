

const EmptyState = ({
  title = "No places founded",
  subtitle = "Something went wrong. Try again please!",
  ButtonLabel = "Reload",
  showReset
}) => {
    
  return ( 
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center ">
        <div className='text-center'>
            <h1 className="font-bold text-[1.3rem] lg:text-[1.5rem]">{title}</h1>
            <p className="font-light text-[0.9rem] lg:text-[1.1rem] text-neutral-500 mt-2">{subtitle}</p>
        </div>
    </div>
   );
}
 
export default EmptyState;