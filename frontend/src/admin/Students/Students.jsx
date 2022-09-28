import React from 'react';
import { useSelector } from 'react-redux';
import {
	IoTrashOutline,
	IoSearchOutline,
	IoCreateOutline,
} from 'react-icons/io5';
import './Students.scss';

const Students = () => {
	// page title

	window.document.title = 'Students List | Admin';

	// hooks

	const students = useSelector((state) => state.students.students);

	// states

	const [search, setSearch] = React.useState('');
	const [filteredStudents, setFilteredStudents] = React.useState([]);

	// effects

	React.useEffect(() => {
		if (search.length > 0) {
			const filtered = students.filter((student) => {
				return (
					student.name.toLowerCase().includes(search.toLowerCase()) ||
					student.studentID
						.toLowerCase()
						.includes(search.toLowerCase())
				);
			});

			setFilteredStudents(filtered);
		} else {
			setFilteredStudents(students);
		}
	}, [search]);

	return (
		<section className='students'>
			<div className='topbar'>
				<h1>
					{search.length > 0
						? `Search Results for "${search}"`
						: `All Students - ${filteredStudents.length}`}
				</h1>

				<div className='input__group'>
					<IoSearchOutline className='icon' />
					<input
						type='text'
						placeholder='Search Student by Name or ID...'
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>

			<div className='allStudents'>
				<table className='table'>
					<thead>
						<tr>
							<th>Student ID</th>
							<th>Name</th>
							<th>Phone</th>
							<th>Created At</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{filteredStudents.map((item) => (
							<tr key={item._id}>
								<td>{item.studentID}</td>
								<td>{item.name}</td>
								<td>{item.phone}</td>
								<td>{item.createdAt.split('T')[0]}</td>
								<td>
									<div className='actions'>
										<button className='btn-edit'>
											<IoCreateOutline />
										</button>

										<button className='btn-delete'>
											<IoTrashOutline />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default Students;
