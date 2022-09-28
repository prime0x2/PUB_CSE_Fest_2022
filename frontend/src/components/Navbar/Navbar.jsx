import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMoon, IoSunny, IoMenu } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice/themeSlice';
import './Navbar.scss';
import { logout } from '../../store/userSlice/userSlice';

const Navbar = () => {
	// hooks

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const theme = useSelector((state) => state.theme.value);
	const user = useSelector((state) => state.user);

	// effects

	React.useEffect(() => {
		if (theme === 'dark') {
			window.document.documentElement.classList.add('dark');
		} else {
			window.document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	// handlers

	const handleLogout = () => {
		dispatch(logout());
		navigate('/');
	};

	return (
		<nav className='navbar'>
			<div className='container'>
				<div className='logo'>
					<button
						onClick={() => {
							navigate('/');
						}}
					>
						<img src='/logo2.png' alt='' />
					</button>
					{user.info && (
						<p>
							Hello,{' '}
							<span className='userName'>{user.info?.name}</span>
						</p>
					)}
				</div>

				<div className='actions'>
					{!user.token ? (
						<div className='user'>
							<button
								className='btn-register'
								onClick={() => navigate('/register')}
							>
								Register
							</button>
							<button
								className='btn-login'
								onClick={() => navigate('/login')}
							>
								Login
							</button>
						</div>
					) : (
						<div className='user'>
							<button
								className='btn-register'
								onClick={() =>
									user.info?.admin
										? navigate('/admin/dashboard')
										: navigate('/profile')
								}
							>
								{user.info?.admin
									? 'Admin Dashboard'
									: 'My Profile'}
							</button>

							<button
								className='btn-login'
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					)}

					<div className='theme'>
						<input
							type='checkbox'
							id='switch'
							className='checkbox'
							onChange={() => {
								dispatch(toggleTheme());
							}}
							defaultChecked={theme === 'dark' ? true : false}
						/>

						<label htmlFor='switch' className='label'>
							<IoMoon className='moon' />
							<IoSunny className='sun' />
							<div className='ball'></div>
						</label>
					</div>
				</div>

				<div className='mobile-nav'>
					<button className='btn-hamburger'>
						<IoMenu className='icon' />
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
