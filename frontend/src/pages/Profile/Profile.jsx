import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import './Profile.scss';

const Profile = () => {
	// page title

	window.document.title = 'My Profile | PUB CSE FEST 2022';

	// hooks

	const userToken = useSelector((state) => state.user.token);

	// states

	const [data, setData] = React.useState({
		name: '',
		studentID: '',
		phone: '',
		tShirtSize: '',
		paymentStatus: '',
	});

	const [trxID, setTrxID] = React.useState('');

	const [loading, setLoading] = React.useState(true);
	const [loading2, setLoading2] = React.useState(false);

	// effects

	React.useEffect(() => {
		setLoading(true);

		const url = `${import.meta.env.VITE_API}/api/student/profile`;

		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': userToken,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('my profile res : ', res);
				if (res.status === 200) {
					const trxID = res.data?.fest2022?.payment?.trxID;
					const payStatus = res.data?.fest2022?.payment?.status;
					setData({
						name: res.data.name,
						studentID: res.data.studentID,
						phone: res.data.phone,
						tShirtSize: res.data?.fest2022?.tShirtSize || '',
						payment:
							trxID === null
								? 'not paid'
								: trxID !== null && payStatus === 'pending'
								? 'pending'
								: trxID !== null && payStatus === 'approved'
								? 'paid'
								: trxID !== null && payStatus === 'rejected'
								? 'rejected'
								: 'not paid',
					});
				} else {
					toast.error(res.message);
				}
			})
			.catch((err) => {
				console.log('my profile err : ', err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	// functions

	const handlePayment = () => {
		setLoading2(true);

		const url = `${import.meta.env.VITE_API}/api/student/payment`;

		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': userToken,
			},
			body: JSON.stringify({
				transactionID: trxID,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('payment res : ', res);
				if (res.status === 200) {
					toast.success(res.message);
					setData({
						...data,
						payment: 'pending',
					});
				} else {
					toast.error(res.message);
				}
			})
			.catch((err) => {
				console.log('payment err : ', err);
			})
			.finally(() => {
				setLoading2(false);
			});
	};

	if (loading)
		return (
			<div className='loader dark:text-white text-center text-xl my-10'>
				Loading...
			</div>
		);

	return (
		<section className='profile page'>
			<div className='container'>
				<h1>
					{data.payment === 'not paid' ? 'Payment' : 'My Profile'}
				</h1>

				<div className='profile__info'>
					{data.payment === 'not paid' ? (
						<div className='payment'>
							<p className='payment__error'>
								<IoWarningOutline className='icon' />
								<span>
									Please pay the registration fee to get
									access to the events.
									<br />
									<br />
									Send <b>500 BDT</b> to the following
									personal <b>bkash</b> number and enter the
									transaction ID below.
									<br />
									<br />
									017XXXXXXXX
								</span>
							</p>

							<div className='payment__form'>
								<input
									type='text'
									placeholder='Enter Transaction ID'
									onChange={(e) => setTrxID(e.target.value)}
									required
								/>

								<button
									className='btn-payment'
									onClick={handlePayment}
									disabled={loading2}
								>
									{loading2 ? <Loading /> : 'Pay Now'}
								</button>
							</div>
						</div>
					) : (
						<p className='text-3xl text-center my-10 font-iceberg text-slate-600 dark:text-white'>
							Coming Soon
						</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default Profile;
