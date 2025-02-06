import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = ({ onResetPassword }) => {
    const [password, setPassword] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('token:', token);
            await axios.post('http://localhost:3001/api/forgotPassword/update-password', {token, password});
            onResetPassword(password);
            setSubmitted(true);
            alert('Password reset!');
        }
        catch (err) {
            const error = err.response.data.error;
            alert(error);
            console.error('Error resetting password:', err);
        }
        
    };

    return (
        <div className='reset-password'>
            <h1>Reset Password</h1>
            {!submitted && <form onSubmit={handleSubmit}>
                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Submit</button>
            </form>}
            {submitted && <h1>Password reset successfully!</h1>}
        </div>
    );
}

export default ResetPassword;