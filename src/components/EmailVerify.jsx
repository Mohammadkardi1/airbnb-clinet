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


	useEffect( async () => {
		try {
			await dispatch(verifyEmail({id: param.id, token: param.token}))
		} catch (error) {
			console.log(error)
		}
	}, [])


	return (
		<>
			{
			loading  ?
				<PageLoadingModel/>
			:
			<div className='w-full h-[500px] lg:h-[800px] flex flex-col gap-6 items-center justify-center  font-bold text-2xl '>
				{isVerified ? (
					<>
						<img src={success} alt="success_img" className='w-[250px] lg:w-[350px]' />
						<h1>
							Email verified successfully! Please Log in.
						</h1>
						<Link to="/login">
							<button className='primary px-12 py-4'>Login</button>
						</Link>
					</>
				) : (
					<>
						<img src={failure} alt="success_img" className='w-[250px] lg:w-[350px]' />
						<h1>
							{authError}
						</h1>
					</>
				)}
			</div>
			}
		</>
	);
};

export default EmailVerify