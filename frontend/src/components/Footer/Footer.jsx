import React from 'react';
import {
	IoMailOutline,
	IoGlobeOutline,
	FaFacebookSquare,
	BsTelephone,
} from 'react-icons/all';
import './Footer.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer__content'>
					<div className='left'>
						<h3>Address</h3>
						<p>Department of CSE, PUB</p>
						<p>
							Pundra University of Science & Technology, Gokul,
							Bogura
						</p>
					</div>

					<div className='right'>
						<h3>Contact Us</h3>

						<div className='infos'>
							<a href='mailto:pubcsefest@gmail.com'>
								<IoMailOutline className='icon' />
							</a>

							<a
								href='https://pub-cse-fest.web.app/'
								target='_blank'
								rel='noreferrer'
							>
								<IoGlobeOutline className='icon' />
							</a>

							<a
								href='https://www.facebook.com/PUBCSEFest'
								target='_blank'
								rel='noreferrer'
							>
								<FaFacebookSquare className='icon' />
							</a>

							<a href='tel:+8801309897793'>
								<BsTelephone className='icon' />
							</a>
						</div>
					</div>
				</div>

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
