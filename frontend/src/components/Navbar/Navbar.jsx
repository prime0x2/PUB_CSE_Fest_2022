import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice/themeSlice';
import './Navbar.scss';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const theme = useSelector((state) => state.theme.value);

	React.useEffect(() => {
		if (theme === 'dark') {
			window.document.documentElement.classList.add('dark');
		} else {
			window.document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	return (
		<nav className='navbar'>
			<div className='container'>
				<div className='logo'>
					<button
						onClick={() => {
							navigate('/');
						}}
					>
						CSE FEST 2022
					</button>
				</div>

				<div className='actions'>
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
			</div>
		</nav>
	);
};

export default Navbar;
