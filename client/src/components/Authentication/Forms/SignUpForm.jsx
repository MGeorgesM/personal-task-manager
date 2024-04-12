const SignupForm = ({ handleSignup, error, formData, setFormData }) => {
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
                        name="fullName"
                        placeholder="Ful Name"
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
        </>
    );
};

export default SignupForm;
