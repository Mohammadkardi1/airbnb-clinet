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

	const clickHandler = () => {
		console.log('isVerified', isVerified)
		console.log('authError', authError)
		console.log(param.id)
		console.log( param.token)

	}

	return (
		<>
		<div onClick={clickHandler}>
			Click here
		</div>
			{
			loading  ?
				<PageLoadingModel/>
			:
			<div className='w-full h-[800px] flex flex-col gap-6 items-center justify-center  font-bold text-2xl '>
				{isVerified ? (
					<>
						<img src={success} alt="success_img" className='w-[350px]' />
						<h1>
							Email verified successfully! Please Log in.
						</h1>
						<Link to="/login">
							<button className='primary px-12 py-4'>Login</button>
						</Link>
					</>
				) : (
					<>
						<img src={failure} alt="success_img" className='w-[350px]' />
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