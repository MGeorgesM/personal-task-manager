const SignupForm = ({ switchHandler, handleSignup, error, formData, setFormData }) => {
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignup(formData);
    };
    return (
        <>
            <form className="flex column center" onSubmit={handleSubmit}>
                <div className="field">

                    <input
                        className="input-btn-lg border-radius-s light-gray-bg border size-s"
                        type="text"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="field">

                    <input
                        className="input-btn-lg border-radius-s light-gray-bg border size-s"
                        type="text"
                        name="name"
                        placeholder="Ful Name"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="field">

                    <input
                        className="input-btn-lg border-radius-s light-gray-bg border size-s"
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
   
                    <input
                        className="input-btn-lg border-radius-s light-gray-bg border size-s"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="flex center validation-display">{error && <p>{error}</p>}</div>
                <button
                    className="input-btn-lg primary-btn box-shadow border-radius-m size-m"
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
            {/* <p>
                Have an Account?{' '}
                <span className="login-link primary-text" onClick={() => switchHandler(true)}>
                    Sign In
                </span>
            </p> */}
        </>
    );
};

export default SignupForm;
