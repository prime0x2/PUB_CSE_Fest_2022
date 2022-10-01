import React from 'react';
import { IoWarningOutline, GiSandsOfTime } from 'react-icons/all';
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
				// console.log('my profile res : ', res);
				if (res.status === 200) {
					const payStatus = res.data?.fest2022?.payment?.status;
					setData({
						name: res.data.name,
						studentID: res.data.studentID,
						phone: res.data.phone,
						tShirtSize: res.data?.fest2022?.tShirtSize || '',
						payment: payStatus,
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
				// console.log('payment res : ', res);
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
				<h1>{data.payment === 'notPaid' ? 'Payment' : 'My Profile'}</h1>

				<div className='profile__info'>
					{data.payment === 'notPaid' && (
						<div className='payment'>
							<p className='payment__error'>
								<IoWarningOutline className='icon' />
								<span>
									Please pay the registration fee to get
									access to the events.
									<br />
									<br />
									Send <b>550 BDT</b> to the following
									personal <b>bkash</b> number and enter the
									transaction ID below.
									<br />
									<br />
									01568810784
									<br />
									01580635803
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
					)}

					{data.payment !== 'notPaid' && (
						<div className='payment__pending'>
							<div className='icon__wrapper'>
								<GiSandsOfTime className='icon' />
							</div>
							<p>
								Your payment is being processed. You will be
								able to access the events after the payment is
								confirmed.
							</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Profile;
