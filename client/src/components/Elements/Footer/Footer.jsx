import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

import './index.css';

const Footer = () => {
    return (
        <div className="footer flex light-gray-bg light-text">
            <div className="footer-social flex center">
                <FontAwesomeIcon icon={faTwitter} className='social-i' />
                <FontAwesomeIcon icon={faFacebook} className='social-i' />
                <FontAwesomeIcon icon={faInstagram} className='social-i' />
                <p>Personal Task Manager - Georges Mouawad - April 2024 - Taha Taha - SE Factory</p>
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
