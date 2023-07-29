import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPlace, editPlace, getPlace } from "../../redux/actions/PlaceActions";
import { PlaceActions } from "../../redux/slices/PlaceSlice";
import {perk_items} from '../../assets/data/DataItems'
import Select from 'react-select'
import useCountries from '../../hooks/useCountries'
import PageLoadingModel from "../Models/PageLoadingModel";
import PreInput from "../PreInput";



const PlaceForm = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: {errors}, setValue, reset, watch } = useForm({})
    const [perks, setPerks] = useState([]);
    const { loading, place } = useSelector(state => state.place)
    const { getAll } = useCountries()

    const isUpdated = Boolean(searchParams.get('placeId'));

    
    
    useEffect( async () => {
        if (isUpdated) {
            try {
                await dispatch(getPlace(searchParams.get('placeId')))
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    useEffect( () => {
        if (isUpdated) {
            try {
                setValue('title', place?.title)
                setValue('description', place?.description)
                setValue('extraInfo', place?.extraInfo)
                setValue('maxGuests', place?.maxGuests)
                setValue('rooms', place?.rooms)
                setValue('bathrooms', place?.bathrooms)
                setValue('price', place?.price)
                setValue('category', place?.category)
                setValue('location', place?.location)
                setPerks(place?.perks)   
            } catch (error) {
                console.log(error)
            }
        }
    }, [place])



    const perkClick = (ev) => {
        const {checked,name} = ev.target;
        if (checked) {
          setPerks([...perks,name]);
        } else {
          setPerks([...perks.filter(selectedName => selectedName !== name)]);
        }
      }

    const savePlace = async (data) => {
        console.log(data)
        if (!isUpdated) {
            try {
                await dispatch(PlaceActions.setLoading(true))
                const uploadedImagesURL = []
                for (let i = 0; i < data.photos.length; i++) {
                    const image = new FormData()
                    image.append("file", data.photos[i])
                    image.append("upload_preset", "airbnb")
                    const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,image)
                    const { url, public_id } = uploadRes.data
                    uploadedImagesURL.push({url, public_id})
                }
                await dispatch(createPlace({
                        ...data, 
                        perks, 
                        photos: uploadedImagesURL,
                        owner: JSON.parse(localStorage.getItem('profile'))._id
                    }))
                reset()
                navigate('/account/properties')
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await dispatch(editPlace({placeID: searchParams.get('placeId'), 
                place: {...data, perks}}))
                reset()
                navigate('/account/properties')
            } catch (error) {
                console.log(error)
            }
        }
  }



  return (
    <>
        <form onSubmit={handleSubmit(savePlace)} className='space-y-6 my-12'>
            <div>
                <PreInput
                    header= {'Title'}
                    description= {'Title for your place. should be short and catchy as in advertisement'}
                    />
                <input 
                    type="text" 
                    placeholder="e.g. My lovely apt"
                    {...register('title', {
                        required: "Title of the place is required"
                    })}
                />
                <p className={`text-red-600 ${errors.title?.message ? "visible" : "invisible"}`}>
                    {errors.title?.message}.
                </p>
            </div>
            <div>
                <PreInput
                        header= {'Location'}
                        description= {'Where is your place located'}
                        />
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
                <PreInput
                    header= {'Description'}
                    description= {'Description of the place'}
                    />
                <textarea rows={4}
                    {...register('description', {required: 'Please describe the place'})}/>
                <p className={`text-red-600 ${errors.description?.message ? 'visible' : 'invisible'}`}>
                    {errors.description?.message}.
                </p>
            </div>
            {!searchParams.get('placeId') && 
            <div>
                <PreInput
                    header= {'Photos'}
                    description= {'more = better'}
                    />
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
            }
            <div>
                <PreInput
                        header= {'Perks'}
                        description= {'Select all the perks of your place'}
                        />
                <div className="grid mt-2 gap-2 grid-cols-1 sm:grid-cols-3 lg:grid-cols-6">
                    {/* <Perks perks={perks} setPerks={setPerks} /> */}
                    {perk_items.map((perk, index) => (
                        <label key={index} className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer hover:bg-brand hover:text-white hover:border-none">
                            <input type="checkbox" checked={perks?.includes(perk.name)} name={perk.name} onChange={perkClick}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d={perk.d} />
                            </svg>
                            <span>{perk.displayName}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <PreInput
                    header= {'Extra info'}
                    description= {'House rules, etc'}
                    />
                <textarea rows={4} {...register('extraInfo')}/>
            </div>
            <div>
                <PreInput
                    header= {'Category'}
                    description= {'Select the category that accurately describes the place'}
                    />
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
                <PreInput
                    header= {'Rooms & Bathrooms'}
                    description= {'Add number of rooms and bathrooms.'}
                    />
                <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
            <button className="primary py-4 my-4 w-full" type="submit" disabled={loading}>
                {
                    loading ? 
                        <PageLoadingModel  isFixed={false} size={"1.7em"} padding={"0"} color={"#fff"}/>
                    :
                    isUpdated ? "Update" : "Submit"
                }
            </button>
        </form>
    </>
  );
}

export default PlaceForm
