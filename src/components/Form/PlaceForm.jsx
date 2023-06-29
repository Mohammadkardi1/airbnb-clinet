import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPlace } from "../../redux/actions/PlaceActions";
import { PlaceActions } from "../../redux/slices/PlaceSlice";
import {perk_items} from '../../assets/data/DataItems'
import ListingPerks from "../Listings/ListingPerks";
import Select from 'react-select'
import useCountries from '../../hooks/useCountries'
import PageLoadingModel from "../Models/PageLoadingModel";
// import "flag-icon-css/css/flag-icon.min.css";


const preInput = (header,description) => {
    return (
    <>
        <h2 className="text-2xl">{header}</h2>
        <p className="text-gray-500 text-sm mb-1">{description}</p>
    </>
    )
}

const PlaceForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: {errors}, setValue, watch } = useForm()
    const navigate = useNavigate()
    const [perks, setPerks] = useState([]);
    const { loading } = useSelector(state => state.place)
    const { getAll } = useCountries()

    
    const perkClick = (ev) => {
        const {checked,name} = ev.target;
        if (checked) {
          setPerks([...perks,name]);
        } else {
          setPerks([...perks.filter(selectedName => selectedName !== name)]);
        }
      }

    const savePlace = async (data) => {
        try {
            dispatch(PlaceActions.setLoading(true))
            const uploadedImagesURL = []
            for (let i = 0; i < data.photos.length; i++) {
                const image = new FormData()
                image.append("file", data.photos[i])
                image.append("upload_preset", "airbnb")
                const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,image)
                const { url, public_id } = uploadRes.data
                uploadedImagesURL.push({url, public_id})
            }
            dispatch(createPlace({
                    ...data, 
                    perks, 
                    photos: uploadedImagesURL,
                    owner: JSON.parse(localStorage.getItem('profile'))._id
                }))
            navigate('/account/places')
        } catch (error) {
            console.log("Error when uploading the image", error)
        }

  }




    // useEffect(() => {
    //     if (!id) {
    //     return;
    //     }
    //     axios.get('/places/'+id).then(response => {
    //     const {data} = response;
    //     setAddedPhotos(data.photos);
    //     setPerks(data.perks);
    //     });
    // }, [id]);




  return (
    <>


        <form onSubmit={handleSubmit(savePlace)} className='space-y-6 my-12'>
            <div>
                {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                <input type="text" placeholder="e.g. My lovely apt"
                    {...register('title', {
                        required: "Title of the place is required"
                    })}
                />
                <p className={`text-red-600 ${errors.title?.message ? "visible" : "invisible"}`}>
                    {errors.title?.message}.
                </p>
            </div>
            
            {/* <div>
                {preInput('Address', 'Address to this place')}
                <input type="text" placeholder="e.g. 7 April Street"
                    {...register('address', {
                        required: 'Please enter the address'
                    })}
                />
                <p className={`text-red-600 ${errors.address?.message ? 'visible' : 'invisible'}`}>
                    {errors.address?.message}.
                </p>
            </div> */}
            
            
            {/* {preInput('Photos','more = better')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} /> */}
            
            



            <div>
                {preInput('Location','Where is your place located')}
                <Select placeholder="Select Location" isClearable
                    options={getAll()}
                    value={watch('location')}
                    onChange={(value) => setValue('location', value)}
                    required={true}
                    // {...register('country', { required: 'Selecting the category is required' })}
                    formatOptionLabel={(option) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>{option.flag}</div>
                        <div>
                        {option.label},
                        <span className="text-neutral-500 ml-1">
                            {option.region}
                        </span>
                        </div>
                    </div>
                    )}
                    classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                    }}
                    theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {...theme.colors, primary: 'black', primary25: '#ffe4e6'}
                    })}
                />
            </div>


            <div>
                {preInput('Description','Description of the place')}
                <textarea rows={4}
                    {...register('description', {required: 'Please describe the place'})}/>
                <p className={`text-red-600 ${errors.description?.message ? 'visible' : 'invisible'}`}>
                    {errors.description?.message}.
                </p>
            </div>

            <div>
                {preInput('Photos','more = better')}
                <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border border-gray-400 bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                    <input name="photos" type="file" multiple className="hidden" accept="image/*"
                        {...register('photos', {required: "Please add some photos"})}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    Upload
                </label>
                <p className={`text-red-600 ${errors.photos?.message ? 'visible' : 'invisible'}`}>
                        {errors.photos?.message}.
                </p>
            </div>
            
            

            
            <div>
                {preInput('Perks','Select all the perks of your place')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {/* <Perks perks={perks} setPerks={setPerks} /> */}
                    {perk_items.map((perk, index) => (
                        <label key={index} className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer hover:bg-brand hover:text-white hover:border-none">
                            <input type="checkbox" checked={perks.includes(perk.name)} name={perk.name} onChange={perkClick}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d={perk.d} />
                            </svg>
                            <span>{perk.displayName}</span>
                        </label>
                    ))}
                </div>
            </div>
            
            
            <div>
                {preInput('Extra info','House rules, etc')}
                <textarea rows={4} {...register('extraInfo')}/>
            </div>




            <div>
                {preInput('Category','Select the category that accurately describes the place')}
                <select {...register('category', { required: 'Selecting the category is required' })}>
                    <option value="">Select a category</option>
                    <option value="Beach">Beach</option>
                    <option value="Windmills">Windmills</option>
                    <option value="Modern">Modern</option>
                    <option value="Countryside">Countryside</option>
                    <option value="Pools">Pools</option>
                    <option value="Islands">Islands</option>
                    <option value="Lake">Lake</option>
                    <option value="Skiing">Skiing</option>
                    <option value="Castles">Castles</option>
                    <option value="Caves">Caves</option>
                    <option value="Camping">Camping</option>
                    <option value="Arctic">Arctic</option>
                    <option value="Desert">Desert</option>
                    <option value="Barns">Barns</option>
                    <option value="Lux">Lux</option>
                </select>
                <p className={`text-red-600 ${errors.category?.message ? 'visible' : 'invisible'}`}>
                    {errors.category?.message}.
                </p>
            </div>


            <div>
                {preInput('Rooms & Bathrooms','Add number of rooms and bathrooms.')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 mb-2">Rooms
                            <span className={`text-red-600 ${errors.rooms?.message ? 'visible' : 'invisible'}`}>
                                &nbsp;{errors.rooms?.message}.
                            </span>
                        </h3>
                        <input type="number" placeholder="2" {...register('rooms', {required: 'required'})}/>
                    </div>

                    <div>
                        <h3 className="mt-2 mb-2">Bathrooms
                            <span className={`text-red-600 ${errors.bathrooms?.message ? 'visible' : 'invisible'}`}>
                                &nbsp;{errors.bathrooms?.message}.
                            </span>
                        </h3>
                        <input type="number" placeholder="1" {...register('bathrooms', {required: "required"})}/>
                    </div>

                    <div>
                        <h3 className="mt-2 mb-2">Max number of guests
                            <span className={`text-red-600 ${errors.maxGuests?.message ? 'visible' : 'invisible'}`}>
                                &nbsp;{errors.maxGuests?.message}.
                            </span>
                        </h3>
                        <input type="number" {...register('maxGuests', {required: 'required'})}/>
                    </div>

                    <div>
                        <h3 className="mt-2 mb-2">Price per night
                            <span className={`text-red-600 ${errors.price?.message ? 'visible' : 'invisible'}`}>
                                &nbsp;{errors.price?.message}.
                            </span>
                        </h3>
                        <input type="number" {...register('price', {required: "required"})}/>
                    </div>
                </div>
            </div>



            <button className="primary  my-4 w-full" type="submit" disabled={loading}>
                {
                    loading ? 
                        <PageLoadingModel size={"2em"} padding={"0"} color={"#4a148c"}/>
                    :
                    "Save"
                }
            </button>
        </form>
      
    </>
  );
}

export default PlaceForm