import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendRequest, requestMethods } from '../../../core/tools/apiRequest';

export const useNavBarLogic = () => {
    // const [scrolled, setScrolled] = useState(false);
    // const [userRoleId, setUserRoleId] = useState('');
    const navigate = useNavigate();

    // const token = localStorage.getItem('token');

    // const signOut = async () => {
    //     try {
    //         const response = await sendRequest(requestMethods.POST, '/auth/logout', null);
    //         if (response.status === 200) {
    //             setUserRoleId('');
    //             localStorage.clear();
    //             navigate('/');
    //         } else {
    //             return;
    //         }
    //     } catch (error) {
    //         console.log(error.response.data.message);
    //     }
    // };

    // const handleScroll = () => {
    //     if (window.scrollY > 50) {
    //         setScrolled(true);
    //     } else {
    //         setScrolled(false);
    //     }
    // };

    // const getUserRole = async () => {
    //     try {
    //         const response = await sendRequest(requestMethods.GET, '/users/get', null);
    //         if (response.status === 200) {
    //             setUserRoleId(response.data.user.role_id);
    //         } else {
    //             return;
    //         }
    //     } catch (error) {
    //         console.log(error.response.data.message);
    //     }
    // };

    // useEffect(() => {
    //     token && getUserRole();

    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return {};
};
