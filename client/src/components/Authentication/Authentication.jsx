import SignInForm from './Forms/SignInForm';
import SignUpForm from './Forms/SignUpForm';

import { useAuthenticationLogic } from './logic';

import './index.css';

const Authentication = () => {
    const { isLogin, error, formData, setFormData, navigate, switchHandler, handleLogin, handleSignup } =
        useAuthenticationLogic();

    return (
        <>
            <div className="form-component flex center">
                <div className="container flex center column">
                    <div className="logo-form flex column center box-shadow border border-radius-s">
                        <img src="./images/assets/ig-text-logo.png" alt="logo" onClick={() => navigate('/')} />
                        {isLogin ? (
                            <SignInForm
                                switchHandler={switchHandler}
                                handleLogin={handleLogin}
                                error={error}
                                setFormData={setFormData}
                                formdata={formData}
                            />
                        ) : (
                            <SignUpForm
                                switchHandler={switchHandler}
                                handleSignup={handleSignup}
                                setFormData={setFormData}
                                formData={formData}
                                error={error}
                            />
                        )}
                    </div>
                    <div className="register-switch white-bg box-shadow border border-radius-s size-m flex center">
                        {isLogin ? (
                            <p>
                                Don't have an account?{' '}
                                <span className="register-link primary-text" onClick={() => switchHandler(false)}>
                                    Register Now
                                </span>
                            </p>
                        ) : (
                            <p>
                                Have an account'?{' '}
                                <span className="register-link primary-text" onClick={() => switchHandler(true)}>
                                    Sign in
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Authentication;
