import React from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { isExpired, isLoggedIn } from './store/userSlice/userSlice';
import Router from './Router';

const App = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		setInterval(() => {
			dispatch(isLoggedIn());
			dispatch(isExpired());
		}, 1000);
	}, [dispatch]);

	return (
		<>
			<Router />
			<ToastContainer
				position='top-center'
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
};

export default App;
