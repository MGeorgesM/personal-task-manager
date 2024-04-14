import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCurrentUser } from '../../../store/User';
import { useDispatch } from 'react-redux';

import './index.css';

const Navbar = ({ bg = 'no-bg' }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');
    const navBg = bg;

    const handleClick = () => {
        if (token) {
            dispatch(clearCurrentUser());
            localStorage.clear();
            navigate('/auth');
        } else {
            navigate('/auth');
        }
    };

    return (
        <div className={`navbar ${navBg}`}>
            <nav className="nav-elements flex space-between light">
                <img
                    className="logo"
                    alt="logo"
                    src="./assets/images/logo.png"
                    onClick={token ? () => navigate('/') : null}
                />
                <div>
                    <div className="nav-list flex center">
                        <button className="nav-link no-bg" onClick={() => navigate('/analytics')}>
                            Analytics
                        </button>
                        <button className="nav-link no-bg" onClick={() => navigate('/')}>
                            Boards
                        </button>
                        <button
                            className={`nav-login ${token ? 'secondary-btn' : 'primary-btn'} box-shadow border-radius`}
                            onClick={handleClick}
                        >
                            {token ? 'Sign Out' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
