import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin/AdminLogin';
import Dashboard from './admin/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';

const Router = () => {
	// hooks

	const { pathname } = useLocation();
	const isAdmin = useSelector((state) => state.user.info?.admin);

	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />

				{/* {!user && (
					<>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/admin/login' element={<AdminLogin />} />
					</>
				)} */}
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/admin/login' element={<AdminLogin />} />

				{isAdmin ? (
					<>
						<Route
							path='/admin/dashboard/*'
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							}
						/>
					</>
				) : (
					<Route
						path='/profile'
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
				)}

				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
			{pathname.includes('admin/dashboard') ? null : <Footer />}
		</>
	);
};

export default Router;
