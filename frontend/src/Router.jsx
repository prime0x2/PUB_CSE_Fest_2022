import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';

const Router = () => {
	const user = useSelector((state) => state.user.token);

	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />

				{!user && (
					<>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</>
				)}

				<Route
					path='/profile'
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>

				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
			<Footer />
		</>
	);
};

export default Router;
