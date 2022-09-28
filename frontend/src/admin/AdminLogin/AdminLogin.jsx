import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoAtOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/all';
import Loading from '../../components/Loading/Loading';
import { login } from '../../store/userSlice/userSlice';
import './AdminLogin.scss';
import { toast } from 'react-toastify';

const AdminLogin = () => {
	// page title

	window.document.title = 'Admin Login';

	// hooks

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.user.token);

	// states

	const [showPass, setShowPass] = React.useState(false);

	const [data, setData] = React.useState({
		username: '',
		password: '',
	});

	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	// effects

	React.useEffect(() => {
		if (isLoggedIn) {
			navigate('/admin/dashboard');
		}
	}, []);

	// functions

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		const url = `${import.meta.env.VITE_API}/api/admin/login`;

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => {
				// console.log('admin login res : ', res);
				if (
					res.status === 200 &&
					res.message === 'Admin logged in successfully'
				) {
					toast.success(res.message);
					dispatch(login(res.data.token));
					setError('');
					navigate('/admin/dashboard');
				} else {
					toast.error(res.message);
					setError(res.message);
				}
			})
			.catch((err) => {
				console.log(err);
				// setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<section className='adminLogin page'>
			<div className='container'>
				<div className='logo'>
					<h1>Admin Login</h1>
					<img src='/logo.png' alt='' />
				</div>

				<form className='login__form' onSubmit={handleSubmit}>
					<div className='input__group'>
						<input
							type='text'
							placeholder='Username'
							onChange={(e) =>
								setData({ ...data, username: e.target.value })
							}
							required
						/>
						<IoAtOutline className='icon' />
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

export default AdminLogin;
