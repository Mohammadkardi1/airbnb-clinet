import {  Link } from "react-router-dom";
import success from "../assets/images/success.png"
import failure from "../assets/images/failure.png"
import { useParams } from "react-router-dom";
import { verifyEmail } from "../redux/actions/AuthActions";

import { useDispatch, useSelector } from "react-redux";
import PageLoadingModel from "./Models/PageLoadingModel";
import { useEffect } from "react";

const EmailVerify = () => {

    const {isVerified, authError, loading} = useSelector(state => state.auth)
	const param = useParams()
	const dispatch = useDispatch()



	useEffect(() => {
		try {
			dispatch(verifyEmail({id: param.id, token: param.token}))
		} catch (error) {
			console.log(error)
		}
	}, [])

	if (loading) {
		return <PageLoadingModel/>
	}
	


	return (
		<div className='w-full mt-12 flex flex-col gap-6 items-center justify-center font-bold'>
			{isVerified === 1 &&
				<>
					<img src={success} alt="success_img" className='w-[150px] lg:w-[250px]' />
					<h1 className="plain-text text-center">
						Email verified successfully! Please Log in.
					</h1>
					<Link to="/login">
						<button className='primary px-4'>Login</button>
					</Link>
				</>
				}
				
				{isVerified === 0 &&
					<>
						<img src={failure} alt="failure_img" className='w-[150px] lg:w-[250px]' />
						<h1 className="plain-text text-center">
							{authError}
						</h1>
					</>
				}
		</div>
	);
};

export default EmailVerify