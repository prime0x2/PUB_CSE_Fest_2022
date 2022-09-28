import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	GiMoneyStack,
	IoPeopleOutline,
	IoMdCheckboxOutline,
} from 'react-icons/all';
import { setStudents } from '../../store/studentsSlice/studentsSlice';
import './Dashboard.scss';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Students from '../Students/Students';
import Payments from '../Payments/Payments';
import Status from '../Status/Status';

const Dashboard = () => {
	// hooks

	const dispatch = useDispatch();
	const students = useSelector((state) => state.students.students);

	// states

	const [search, setSearch] = React.useState('');
	const [filteredStudents, setFilteredStudents] = React.useState([]);
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(true);

	// effects

	React.useEffect(() => {
		setLoading(true);

		const url = `${import.meta.env.VITE_API}/api/admin/students`;

		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
		})
			.then((res) => res.json())
			.then((res) => {
				// console.log('students list res : ', res);
				if (
					res.status === 200 &&
					res.message === 'Students list fetched successfully' &&
					res.data.length > 0
				) {
					dispatch(setStudents(res.data));
				}
			})
			.catch((err) => {
				console.log('students list err : ', err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<section className='dashboard page'>
			<div className='container'>
				<aside className='sidebar'>
					<NavLink
						className={({ isActive }) =>
							isActive ? 'btn-navItem active' : 'btn-navItem'
						}
						to='/admin/dashboard/students'
					>
						<IoPeopleOutline className='icon' />
						<span>Students</span>
					</NavLink>

					<NavLink
						className={({ isActive }) =>
							isActive ? 'btn-navItem active' : 'btn-navItem'
						}
						to='/admin/dashboard/payments'
					>
						<GiMoneyStack className='icon' />
						<span>Payments</span>
					</NavLink>

					<NavLink
						className={({ isActive }) =>
							isActive ? 'btn-navItem active' : 'btn-navItem'
						}
						to='/admin/dashboard/status'
					>
						<IoMdCheckboxOutline className='icon' />
						<span>Status</span>
					</NavLink>
				</aside>

				<div className='main'>
					{loading ? (
						<div className='loading'>Loading...</div>
					) : (
						<Routes>
							<Route
								path='/'
								element={<Navigate to='students' />}
							/>
							<Route path='students' element={<Students />} />
							<Route path='payments' element={<Payments />} />
							<Route path='status' element={<Status />} />
						</Routes>
					)}
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
