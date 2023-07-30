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
		<div className='w-full h-[500px] lg:h-[800px] flex flex-col gap-6 items-center justify-center font-bold'>
			{isVerified ? (
				<>
					<img src={success} alt="success_img" className='w-[250px] lg:w-[350px]' />
					<h1 className="plain-title">
						Email verified successfully! Please Log in.
					</h1>
					<Link to="/login">
						<button className='primary px-12'>Login</button>
					</Link>
				</>
				) : (
				<>
					<img src={failure} alt="failure_img" className='w-[250px] lg:w-[350px]' />
					<h1 className="plain-title">
						{authError}
					</h1>
				</>
			)}
		</div>
	);
};

export default EmailVerify