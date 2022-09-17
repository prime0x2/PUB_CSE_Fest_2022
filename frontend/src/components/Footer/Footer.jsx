import React from 'react';
import './Footer.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer__content'></div>

				<div className='footer__copyright'>
					<p>
						&copy; PUB CSE FEST {new Date().getFullYear()} |{' '}
						{/* Developed By <span>DevBro&apos;s</span> */}
						All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
