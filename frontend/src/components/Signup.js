import React, {useState, useRef} from 'react';
import axios from 'axios';
import { useJsApiLoader } from '@react-google-maps/api';
import { StandaloneSearchBox } from '@react-google-maps/api';
import GeocodeService from '../services/geocodeService';

const multiavatar = require('@multiavatar/multiavatar')


const libraries = ['places'];

const Signup = ({onSignup}) => {
    const [data, setData] = useState({firstName: '', lastName: '', email: '', password: '', address: ''});
    const inputRef = useRef(null);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const getLatLng = async (address) => {
        const { lat, lng } = await GeocodeService.convertAddressToLatLng(address);
        return { lat, lng };
    }

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const places = inputRef.current.getPlaces();
            if (!places || !places[0]) {
                alert('Please select an address from the dropdown');
                return;
            }
            const { lat, lng } = await getLatLng(data.address);

            await axios.post('http://localhost:3001/api/signup', {data, lat: lat, lng: lng})
                .then((res) => {
                    console.log(res.data);
                    onSignup(res.data);
                    
                    const avatar = multiavatar(data.email);
                    const user = {Authorization: res.data.Authorization, user: res.data.user.firstName, email: res.data.user.email, address: res.data.user.address,
                        lat: res.data.user.lat, lng: res.data.user.lng,
                         lastName: res.data.user.lastName, id: res.data.user.id, avatar: avatar};
                    sessionStorage.setItem('user', JSON.stringify(user));

                    setData({firstName: '', lastName: '', email: '', password: '', address: ''});   
                });
        } catch (err) {
            const error = err.response.data.error;
            alert(error);
            console.error('Error signing up:', err);
        }
    };

    const handleOnPlacesChanged = () => {
        const places = inputRef.current.getPlaces();
        console.log('places:', places); 
        if (places && places[0]) {
            const address = places[0].formatted_address;
            setData((prevData) => ({ ...prevData, address: address }));
        }
        else {
            alert('Address not found, please select from dropdown');
        }
    };

    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" name="firstName" value={data.firstName} onChange={handleChange} required/>
                <br />
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" name="lastName" value={data.lastName} onChange={handleChange} required/>
                <br />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={data.email} onChange={handleChange} required/>
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={data.password} onChange={handleChange} required/>
                <br />
                <label htmlFor="address">Address:</label>
                {isLoaded && (
                            <StandaloneSearchBox
                                onLoad={(ref) => (inputRef.current = ref)}
                                onPlacesChanged={handleOnPlacesChanged}
                            >
                                <input type="text" name="address" value={data.address} onChange={handleChange} placeholder='Enter your address'
                                required />
                            </StandaloneSearchBox>
                )}                
                <br />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
    }

export default Signup;