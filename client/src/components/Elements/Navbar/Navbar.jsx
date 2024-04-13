import { useNavBarLogic } from './logic';

import './index.css';

const Navbar = ({ bg = 'no-bg' }) => {
    const { token, signOut, navigate, userRoleId } = useNavBarLogic();

    const navBg = 'black-bg-trsp';

    return (
        <div className={`navbar ${navBg}`}>
            <nav className="nav-elements flex space-between light">
                <img className="logo" alt="logo" src="./assets/images/logo.png" onClick={() => navigate('/boards')} />
                <div>
                    <div className="nav-list flex center">
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
