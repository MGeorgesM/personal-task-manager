import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendRequest, requestMethods } from '../../core/tools/apiRequest';
import { setCurrentUser } from '../../store/User';
import { setBoards } from '../../store/Boards';

export const useAuthenticationLogic = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!formData.email.includes('@') && formData.email.length > 0) {
            setError('Invalid email');
        } else if (formData.password.length < 6 && formData.password.length > 0) {
            setError('Password must be at least 6 characters');
        } else {
            setError('');
        }
    }, [formData]);

    const switchHandler = (isLogin) => {
        setIsLogin(isLogin);
    };

    const handleLogin = async (formData) => {
        try {
            const response = await sendRequest(requestMethods.POST, '/auth/login', formData);
            if (response.status === 200) {

                dispatch(setCurrentUser(response.data.user));
                // dispatch(setBoards(response.data.user.boards));

                localStorage.setItem('token', JSON.stringify(response.data.token));

                navigate('/');
            } else {
                throw new Error();
            }
        } catch (error) {
            setError('Wrong email or password');
            console.log(error.response.data.error);
        }
    };

    const handleSignup = async (formData) => {
        try {
            const response = await sendRequest(requestMethods.POST, '/auth/register', formData);
            if (response.status === 201) {

                dispatch(setCurrentUser(response.data.user));
                // dispatch(setBoards(response.data.user.boards));

                localStorage.setItem('token', JSON.stringify(response.data.token));

                navigate('/');
            } else {
                throw new Error();
            }
        } catch (error) {
            setError(error.response.data.error);
            console.log(error.response.data.error);
        }
    };
    return { isLogin, error, formData, setFormData, switchHandler, handleLogin, handleSignup };
};
