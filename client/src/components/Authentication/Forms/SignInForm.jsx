import React from 'react';

import '../index.css';

const SignInForm = ({ switchHandler, handleLogin, error, setFormData, formdata }) => {
    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        handleLogin(formdata);
        e.preventDefault();
    };

    return (
        <>
            <form className="flex column center" onSubmit={handleSubmit}>
                <div className="field">
                    <input
                        type="text"
                        name="email"
                        placeholder="Phone number, email or username"
                        onChange={handleChange}
                        className="off-white-bg input-btn-lg light-gray-bg border size-m"
                        required
                    />
                </div>
                <div className="field">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="off-white-bg input-btn-lg light-gray-bg border size-m"
                        required
                    />
                </div>
                {error && (
                    <div className="flex center validation-display size-m">
                        <p>{error}</p>
                    </div>
                )}
                <button className="input-btn-lg primary-btn size-l box-shadow border-radius" type="submit">
                    Log in
                </button>
            </form>
            {/* <p>
                Don't have an account'?{' '}
                <span className="register-link primary-text" onClick={() => switchHandler(false)}>
                    Register Now
                </span>
            </p> */}
        </>
    );
};

export default SignInForm;
