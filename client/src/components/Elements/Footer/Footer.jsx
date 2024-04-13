import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

import './index.css';

const Footer = () => {
    return (
        <div className="footer flex gray-bg white-text light">
            <div className="footer-social flex center">
                <FontAwesomeIcon icon={faTwitter} className='social-i' />
                <FontAwesomeIcon icon={faFacebook} className='social-i' />
                <FontAwesomeIcon icon={faInstagram} className='social-i' />
                <p>Onwards - Subway Management Website - SEF April 2024</p>
            </div>
            <div className="footer-text">
                <div className="footer-links flex center">
                    <span href="#">Careers</span>
                    <span href="#">About Us</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
