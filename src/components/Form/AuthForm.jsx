import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation} from "react-router-dom"
import { useForm } from "react-hook-form";
import { loginUser, registerUser, resendVerification, googleLogin  } from '../../redux/actions/AuthActions'
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/authForm.css'
import { GoogleLogin   } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import {AuthActions} from '../../redux/slices/AuthSlice'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PageLoadingModel from '../../components/Models/PageLoadingModel';


const validatePassword = (value) => {
    if (!value) {
      return "Please enter your password";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(value)) {
      return "Password must contain at least one number";
    }
    if (!/[$-/:-?{-~!"^_`\[\]]/.test(value)) {
      return "Password must contain at least one symbol";
    }
    return null;
  }




const AuthForm = ({type}) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register,  handleSubmit, formState: {errors}, reset, watch  } = useForm()
    const { authError, loading } = useSelector((state) => state.auth)

    const [showPassword, setShowPassword] = useState(false);
  
    const redirectPath = location.state?.path || '/home'


    useEffect(() => {
        try {
            reset()
            dispatch(AuthActions.clearAuthError())
        } catch (error) {
            console.log(error)
        }
    }, [location])

    const handleRegisterUser = async (data) => {
        if (type === 'register') {
            try {
                const res = await dispatch(registerUser(data))
                if (!res.error) {
                    navigate(redirectPath, {replace :true})
                  }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const res =  await dispatch(loginUser(data))
                if (!res.error) {
                    navigate(redirectPath, {replace :true})
                  }
            } catch (error) {
                console.log(error)
            }
        }
    }


    const googleSuccess = async (res) => {
        const {email, name: username, picture } = jwt_decode(res.credential)

        try {
            const res = await dispatch(googleLogin({email, username, picture}))
            if (!res.error) {
                navigate(redirectPath, {replace :true})
                }
        } catch (error) {
            console.log(error)
        }
      }
    
      const googleError = (error) => {
        console.log(error)
      }

    const resendVerificationHandler = async () => {
        try {
            await dispatch(resendVerification(watch('email')))
        } catch (error) {
            console.log(error)
        }
        
    }
    
    const switchModel =() => {
        const switchRoute = type === 'login'  ? '/register' : '/login'
        navigate(switchRoute, {state : {path:location.state?.path}, replace :true})
    }

return (

    <>
    {loading &&
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-25">
            <PageLoadingModel/>
        </div>
        }
    <div className="my-12  flex items-center justify-around">
        <div className="border border-gray-400 rounded-md w-[600px] shadow-md shadow-gray-300">
            <h1 className="py-4 text-[2rem] font-medium text-center mb-4 border-b border-gray-400">
                {type === 'login' ? 'Log in' : 'Register'}
            </h1>
            <div className="p-8 space-y-4">
                <form className="space-y-4" onSubmit={handleSubmit(handleRegisterUser)}>
                    <h1 className="text-[1.5rem] font-medium mb-8">
                        Welcome to Airbnb
                    </h1>
                    {type !== 'login' &&
                    <div>
                        <input type="text" placeholder="Username"
                            className='peer p-4 font-light bg-white border-2 transition'
                            {...register("username", {
                            required: "Please enter your name",
                            minLength: {
                                value: 4,
                                message: "Username must be at least 4 characters long"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9\s]+$/,
                                message: "Username must be alphanumeric"
                            }
                            })}
                            />
                            <p className={`text-red-600 ${errors.username?.message ? "visible" : "invisible"}`}>
                                {errors.username?.message}.
                            </p>
                        </div>
                    }
                    <div>
                        <input type="text" placeholder="Email"
                            {...register("email",{
                            required:"Please enter your email",
                            pattern: {
                                value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                                message: "Please Enter a Valid Email"
                            }
                        })}
                        />
                        <p className={`text-red-600 ${errors.email?.message ? "visible" : "invisible"}`}>
                            {errors.email?.message}.
                        </p>
                    </div>
                    <div>
                        <div className='flex items-center justify-between w-full border border-gray-400   rounded-lg overflow-hidden'>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password"
                                    className='flex-grow border-none  overflow-hidden'
                                {...register("password", {
                                    validate: validatePassword
                                })}
                            />
                            <div 
                                className='p-4 text-gray-500 cursor-pointer h-full border-l-2 border-gray-500'
                                onClick={() => setShowPassword(!showPassword)}>
                                <RemoveRedEyeIcon size={25} />
                            </div>
                        </div>
                        <p className={`text-red-600 ${errors.password?.message ? "visible" : "invisible"}`}>
                            {errors.password?.message}.
                        </p>
                    </div>
                    <button type="submit" className="primary py-4 w-full">
                        {type === 'login' ? 'Log in' : 'Register'}
                    </button>

                    <p className={`text-red-600 text-center ${authError ? "visible" : "invisible"}`}>
                        {authError}
                    </p>
                </form>
                {authError === "Your account has not verified yet. Please check your email for a verification link." 
                    &&
                    <div className='flex justify-center'>
                        <button  className="text-black underline"
                            onClick={resendVerificationHandler}>
                            Resend verification email?
                        </button>
                    </div>
                }
                <div className="text-center py-2 text-gray-500">
                    {type === 'login' ? "Don't have an account yet?" : 'Already have an account?'}
                    &nbsp;
                    <div className='inline cursor-pointer' onClick={switchModel}>
                        <p className='inline underline text-black'>{type === 'login' ? 'Register' : 'Log in'}</p>
                    </div>
                </div>
                <div className="separate-line py-4 font-medium flex justify-center items-center">
                    <p className="mx-4">or</p>
                </div>
                <div className='flex justify-center z-10'>
                    <GoogleLogin
                        shape="rectangle"
                        buttonText=""
                        textButton='Continue with Google'
                        render={(renderProps) => ( 
                            <button 
                                className='w-full text-[1.3rem] font-medium flex justify-center items-center gap-4 py-4 rounded-lg border border-black'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                >
                                Continue with Google
                            </button>
                        )}
                        onSuccess={googleSuccess}
                        onError={googleError}
                        cookiePolicy="single_host_origin"
                    />
                </div>
            </div>
        </div>
    </div>
    </>
)
}

export default AuthForm