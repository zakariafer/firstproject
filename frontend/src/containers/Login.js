import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';

// The Login component receives the login action and isAuthenticated state as props
const Login = ({ login, isAuthenticated }) => {
    // State to manage form data and login error
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [loginError, setLoginError] = useState('');

    // Destructuring username and password from formData
    const { username, password } = formData;

    // Event handler to update formData on input change
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Event handler to handle form submission
    const onSubmit = async e => {
        e.preventDefault();

        // Attempt to log in with provided credentials
        const loginSuccess = await login(username, password);

        // If login is not successful, set an error message
        if (!loginSuccess) {
            setLoginError('Invalid credentials. Please try again.');
        }
    };

    // If user is already authenticated, redirect to the dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    // Render the login form
    return (
        <div className="container mt-5">
            <h1>Sign into your Account</h1>
            {/* Display login error message if exists */}
            {loginError && <p className="text-danger">{loginError}</p>}
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken />
                <div className="form-group">
                    <label className="form-label"> Username :</label>
                    {/* Input for username */}
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Username*"
                        name="username"
                        required
                        onChange={e => onChange(e)}
                        value={username}
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="form-label"> Password :</label>
                    {/* Input for password */}
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Password*"
                        name="password"
                        required
                        onChange={e => onChange(e)}
                        value={password}
                        minLength="8"
                    />
                </div>
                {/* Submit button */}
                <button className="btn btn-primary mt-3" type="submit">
                    Login
                </button>
            </form>
            <p>
                Don't have an Account ? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    );
};

// Map the isAuthenticated state from the Redux store to props
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

// Connect the component to the Redux store, providing the login action and isAuthenticated state
export default connect(mapStateToProps, { login })(Login);
