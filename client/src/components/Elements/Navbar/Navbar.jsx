import { useNavBarLogic } from './logic';

import './index.css';

const Navbar = ({ bg = 'no-bg' }) => {
    const { token, signOut, navigate, userRoleId } = useNavBarLogic();

    const navBg = 'black-bg-trsp';

    return (
        <div className={`navbar ${navBg}`}>
            <nav className="nav-elements flex space-between light">
                <img className="logo" alt="logo" src="./assets/images/logo.png" onClick={() => navigate('/')} />
                <div>
                    <div className="nav-list flex center">
                        <button
                            className="nav-link white-text no-bg"
                            onClick={() => {
                                userRoleId === 3
                                    ? navigate('/admin-panel')
                                    : userRoleId === 2
                                    ? navigate('/branch-panel')
                                    : userRoleId === 1
                                    ? navigate('/profile')
                                    : navigate('/');
                            }}
                        >
                            {userRoleId === 3
                                ? 'Admin Panel'
                                : userRoleId === 2
                                ? 'Manager Panel'
                                : userRoleId === 1
                                ? 'Profile'
                                : 'About'}
                        </button>
                        <button
                            className={`nav-login ${token ? 'secondary-btn' : 'primary-btn'} box-shadow border-radius`}
                            onClick={() => {
                                if (userRoleId) {
                                    signOut();
                                } else {
                                    navigate('/auth');
                                }
                            }}
                        >
                            {userRoleId ? 'Sign Out' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
