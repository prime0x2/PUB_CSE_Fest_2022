import React from 'react';
import { BiHash, IoEyeOutline, IoEyeOffOutline } from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../store/userSlice/userSlice';
import Loading from '../../components/Loading/Loading';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	// page title

	window.document.title = 'Login | PUB CSE FEST 2022';

	// hooks

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.user.token);

	// states

	const [showPass, setShowPass] = React.useState(false);

	const [data, setData] = React.useState({
		studentID: '',
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

		const url = `${import.meta.env.VITE_API}/api/student/login`;

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => {
				// console.log('login res : ', res);
				if (
					res.status === 200 &&
					res.message === 'Student logged in successfully'
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
				console.log('login err : ', err);
				// setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<section className='login page'>
			<div className='container'>
				<div className='logo'>
					<img src='/logo.png' alt='' />
				</div>

				<form className='login__form' onSubmit={handleSubmit}>
					<div className='input__group'>
						<input
							type='text'
							placeholder='Student ID'
							onChange={(e) =>
								setData({ ...data, studentID: e.target.value })
							}
							required
						/>
						<BiHash className='icon' />
					</div>

					<div className='input__group'>
						<input
							type={showPass ? 'text' : 'password'}
							onChange={(e) =>
								setData({ ...data, password: e.target.value })
							}
							placeholder='Password'
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

					<button className='btn-login' disabled={loading}>
						{loading ? <Loading /> : 'Login'}
					</button>
				</form>
			</div>
		</section>
	);
};

export default Login;
