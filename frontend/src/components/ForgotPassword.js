import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Email sent!');

        axios.post('http://localhost:3001/api/forgotPassword/reset-password', { email }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            const error = err.response.data.error;
            alert(error);
            console.error('Error sending email:', err);
        });

    };



    return (
        <div className='forgot-password'>
            <h1>Forgot Password?</h1>
            <p>Enter your email address below and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default ForgotPassword;