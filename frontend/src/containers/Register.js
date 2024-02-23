// Import necessary dependencies
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';

// Define the Register component
const Register = ({ register, isAuthenticated }) => {
    // State to manage form data and account creation status
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: ''
    });

    const [accountCreated, setAccountCreated] = useState(false);

    // Destructure form data
    const { username, password, re_password } = formData;

    // Event handler to update form data on input change
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Event handler for form submission
    const onSubmit = e => {
        e.preventDefault();

        // Check if passwords match before attempting registration
        if (password === re_password) {
            register(username, password, re_password);
            setAccountCreated(true);
        }
    };

    // If the user is already authenticated, redirect to the dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    } else if (accountCreated) {
        // If the account is created successfully, redirect to the login page
        return <Navigate to="/login" />;
    }

    // Render the registration form
    return (
        <div className='container mt-5'>
            <h1>Register for an Account</h1>
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken />
                <div className='form-group'>
                    <label className='form-label'> Username :</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        required
                        onChange={e => onChange(e)}
                        value={username}
                    />
                </div>
                <div className='form-group mt-3'>
                    <label className='form-label'> Password :</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        required
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='8'
                    />
                </div>
                <div className='form-group mt-3'>
                    <label className='form-label'> Confirm Password :</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        required
                        onChange={e => onChange(e)}
                        value={re_password}
                        minLength='8'
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>
                    Register
                </button>
            </form>
            <p>
                Already have an Account ? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
};

// Map the isAuthenticated state from Redux to props
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

// Connect the component to Redux and export it
export default connect(mapStateToProps, { register })(Register);
