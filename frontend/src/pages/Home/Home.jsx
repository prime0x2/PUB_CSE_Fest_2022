import React from 'react';
import { useNavigate } from 'react-router-dom';
import { events } from '../../data';
import './Home.scss';

const Home = () => {
	// page title

	window.document.title = 'CSE FEST 2022 | PUB';

	// hooks

	const navigate = useNavigate();

	return (
		<section className='home page'>
			<div className='hero__section'>
				<h1>Join The PUB CSE Fest 2022</h1>
				<p>
					PUB&apos;s biggest fest is coming! Register and join the
					fest to get access to the events.
					<br />
					Are you ready for the biggest fest of PUB? Join us now!
				</p>

				<div className='actions'>
					<button
						className='btn-register'
						onClick={() => navigate('/register')}
					>
						Register Now
					</button>
					<button className='btn-community'>
						Join The Community
					</button>
				</div>
			</div>

			<div className='events__section'>
				<h1>Events</h1>

				<div className='events'>
					{events.map((event, index) => (
						<div className='event' key={index}>
							<div className='event__icon'>
								<img src={event.image} alt={event.name} />
							</div>
							<h1>{event.name}</h1>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Home;
