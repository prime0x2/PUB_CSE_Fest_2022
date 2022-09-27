import React from 'react';
import './Home.scss';

const Home = () => {
	// page title

	window.document.title = 'CSE FEST 2022 | PUB';

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
					<button className='btn-register'>Register Now</button>
					<button className='btn-community'>
						Join The Community
					</button>
				</div>
			</div>
		</section>
	);
};

export default Home;
