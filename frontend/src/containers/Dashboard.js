import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { update_profile } from '../actions/profile';
import { delete_account } from '../actions/auth';

// Dashboard component displays user profile information and allows updates
const Dashboard = ({
    delete_account,
    update_profile,
    first_name_global,
    last_name_global,
    phone_global,
    city_global
}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        city: ''
    });

    // Destructure form data
    const { first_name, last_name, phone, city } = formData;

    // Update form data when global profile information changes
    useEffect(() => {
        setFormData({
            first_name: first_name_global,
            last_name: last_name_global,
            phone: phone_global,
            city: city_global,
        });
    }, [first_name_global, last_name_global, phone_global, city_global]);

    // Handle form input changes
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Handle form submission
    const onSubmit = e => {
        e.preventDefault();
        update_profile(first_name, last_name, phone, city);
    };

    return (
        <div className='container'>
            <h1 className='mt-3'>Welcome to Your Dashboard</h1>
            <p className='mt-3 mb-3'>Update Your profile below:</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='first_name'>First Name</label>
                    <input
                        className='form-control'
                        type='text'
                        name='first_name'
                        placeholder={`${first_name_global}`}
                        onChange={e => onChange(e)}
                        value={first_name}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='last_name'>Last Name</label>
                    <input
                        className='form-control'
                        type='text'
                        name='last_name'
                        placeholder={`${last_name_global}`}
                        onChange={e => onChange(e)}
                        value={last_name}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='phone'>Phone</label>
                    <input
                        className='form-control'
                        type='text'
                        name='phone'
                        placeholder={`${phone_global}`}
                        onChange={e => onChange(e)}
                        value={phone}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='city'>City</label>
                    <input
                        className='form-control'
                        type='text'
                        name='city'
                        placeholder={`${city_global}`}
                        onChange={e => onChange(e)}
                        value={city}
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Update Profile</button>
            </form>
            <p className='mt-5'>
                Click the button below to delete your account:
            </p>
            <a
                className='btn btn-danger'
                href='#!'
                onClick={delete_account}
            >
                Delete Account
            </a>
        </div>
    );
};

// Map global profile information to props
const mapStateToProps = state => ({
    first_name_global: state.profile.first_name,
    last_name_global: state.profile.last_name,
    phone_global: state.profile.phone,
    city_global: state.profile.city,
});

// Connect component to Redux store and export
export default connect(mapStateToProps, {
    delete_account,
    update_profile
})(Dashboard);
