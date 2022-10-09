import React from 'react';
import {
	BiHash,
	IoEyeOutline,
	IoCallOutline,
	IoEyeOffOutline,
	IoPersonOutline,
} from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import { login } from '../../store/userSlice/userSlice';
import './Register.scss';

const Register = () => {
	// page title

	window.document.title = 'Register | PUB CSE FEST 2022';

	// hooks

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.user.token);

	// states

	const [showPass, setShowPass] = React.useState(false);

	const [data, setData] = React.useState({
		name: '',
		studentID: '',
		phone: '',
		password: '',
	});

	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	// effects

	React.useEffect(() => {
		if (isLoggedIn) {
			navigate('/profile');
		}
	}, [isLoggedIn]);

	// functions

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		const url = `${import.meta.env.VITE_API}/api/student/register`;

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => {
				// console.log('register res : ', res);
				if (
					res.status === 200 &&
					res.message === 'Student registered successfully'
				) {
					toast.success(res.message);
					dispatch(login(res.data.token));
					setError('');
				} else {
					toast.error(res.message);
					setError(res.message);
				}
			})
			.catch((err) => {
				console.log('register err : ', err);
				// setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<section className='register page'>
			<div className='container'>
				<div className='logo'>
					<img src='/logo.png' alt='' />
				</div>

				<form className='register__form' onSubmit={handleSubmit}>
					<div className='input__group'>
						<input
							type='text'
							placeholder='Full Name'
							onChange={(e) => {
								setData({
									...data,
									name: e.target.value,
								});
							}}
							required
						/>
						<IoPersonOutline className='icon' />
					</div>

					<div className='input__group'>
						<input
							type='number'
							placeholder='Student ID'
							onChange={(e) => {
								setData({
									...data,
									studentID: e.target.value,
								});
							}}
							required
						/>
						<BiHash className='icon' />
					</div>

					<div className='input__group'>
						<input
							type='number'
							placeholder='Phone Number'
							onChange={(e) => {
								setData({
									...data,
									phone: e.target.value,
								});
							}}
							required
						/>
						<IoCallOutline className='icon' />
					</div>

					<div className='input__group'>
						<input
							type={showPass ? 'text' : 'password'}
							placeholder='Your Password'
							onChange={(e) => {
								setData({
									...data,
									password: e.target.value,
								});
							}}
							required
						/>
						{showPass ? (
							<IoEyeOutline
								className='icon cursor-pointer'
								onClick={() => setShowPass(false)}
							/>
						) : (
							<IoEyeOffOutline
								className='icon cursor-pointer'
								onClick={() => setShowPass(true)}
							/>
						)}
					</div>

					{error && <p className='error'>{error}</p>}

					<button
						className='btn-register'
						type='submit'
						disabled={loading}
					>
						{loading ? <Loading /> : 'Register'}
					</button>
				</form>
			</div>
		</section>
	);
};

export default Register;
