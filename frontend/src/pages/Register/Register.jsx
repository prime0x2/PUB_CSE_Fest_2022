import React from 'react';
import {
	BiHash,
	IoEyeOutline,
	IoEyeOffOutline,
	IoPersonOutline,
} from 'react-icons/all';
import './Register.scss';

const Register = () => {
	// page title

	window.document.title = 'Register | PUB CSE FEST 2022';

	// states

	const [showPass1, setShowPass1] = React.useState(false);
	const [showPass2, setShowPass2] = React.useState(false);

	// functions

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<section className='register page'>
			<div className='container'>
				<div className='logo'>
					<img src='/logo.png' alt='' />
				</div>

				<form className='register__form' onSubmit={handleSubmit}>
					<div className='input__group'>
						<input type='text' placeholder='Full Name' />
						<IoPersonOutline className='icon' />
					</div>

					<div className='input__group'>
						<input type='number' placeholder='Student ID' />
						<BiHash className='icon' />
					</div>

					<div className='input__group'>
						<input
							type={showPass1 ? 'text' : 'password'}
							placeholder='New Password'
						/>
						{showPass1 ? (
							<IoEyeOutline
								className='icon cursor-pointer'
								onClick={() => setShowPass1(false)}
							/>
						) : (
							<IoEyeOffOutline
								className='icon cursor-pointer'
								onClick={() => setShowPass1(true)}
							/>
						)}
					</div>

					<div className='input__group'>
						<input
							type={showPass2 ? 'text' : 'password'}
							placeholder='Confirm Password'
						/>
						{showPass2 ? (
							<IoEyeOutline
								className='icon cursor-pointer'
								onClick={() => setShowPass2(false)}
							/>
						) : (
							<IoEyeOffOutline
								className='icon cursor-pointer'
								onClick={() => setShowPass2(true)}
							/>
						)}
					</div>

					<button className='btn-register' type='submit'>
						Register
					</button>
				</form>
			</div>
		</section>
	);
};

export default Register;
