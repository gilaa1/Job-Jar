import React, {useState} from 'react';
import axios from 'axios';



const Login = ({onLogin}) => {
    const [data, setData] = useState({email: '', password: ''});


    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           await axios.post('http://localhost:3001/api/login', data)
           .then((res) => {
                console.log(res.data);
                onLogin(res.data);
                const user = {Authorization: res.data.Authorization, user: res.data.user.firstName, email: res.data.user.email, address: res.data.user.address, lastName: res.data.user.lastName, id: res.data.user.id,
                    lat: res.data.user.lat, lng: res.data.user.lng, avatar: res.data.user.avatar};
                sessionStorage.setItem('user', JSON.stringify(user));
                setData({email: '', password: ''});
              });
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'An unexpected error occurred. Please try again.';
            alert(errorMessage);
            console.error('Error logging in:', err);
        }
    }

        return (

            <div className="login">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={data.email} onChange={handleChange} required/>
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={data.password} onChange={handleChange} required/>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>

        );
    };

export default Login;