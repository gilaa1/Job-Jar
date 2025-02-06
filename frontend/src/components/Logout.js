import axios from 'axios';
import { UserContext } from '../App';
import { useContext } from 'react';

const Logout = ({ onLogout }) => {
    const user = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('user:', user);
            if (!user || !user.token) {
                alert('User is not authenticated.');
                return;
            }
    
            await axios.post(
                'http://localhost:3001/api/logout',
                {},
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
    
            onLogout();
            sessionStorage.removeItem('user');
            console.log('Logged out');

        } catch (err) {
            const errorMessage = err.response?.data?.error || 'An unexpected error occurred. Please try again.';
            alert(errorMessage);
            console.error('Error logging out:', err);
        }
    };


    return (
        <div className="logout">
            <button className="logout-btn" onClick={handleSubmit}>Logout</button>
        </div>
    );
};

export default Logout;
