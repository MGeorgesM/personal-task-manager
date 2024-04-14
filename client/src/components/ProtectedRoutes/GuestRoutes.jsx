import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';

const GuestRoutes = ({ children }) => {
    const currentUser = useSelector((global) => global.userSlice.currentUser);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const validate = () => {
        if (currentUser || token) {
            navigate('/');
        } else {
            console.log('User is Guest');
        }
    };

    useEffect(() => {
        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return children;
};

export default GuestRoutes;
