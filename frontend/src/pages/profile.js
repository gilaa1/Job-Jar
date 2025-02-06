import React from 'react';
import Logout from '../components/Logout';
import { UserContext } from '../App';
import { useContext, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useJsApiLoader } from '@react-google-maps/api';
import { StandaloneSearchBox } from '@react-google-maps/api';
import GeocodeService from '../services/geocodeService';


const libraries = ['places'];

const Profile = ({onLogout, onEditProfile}) => {
    const user = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState({firstName: user.firstName, lastName: user.lastName, email: user.email, address: user.address});
    const inputRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries, 
    });

    const getLatLng = async (address) => {
        const { lat, lng } = await GeocodeService.convertAddressToLatLng(address);
        return { lat, lng };
    }


    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleOnPlacesChanged = () => {
        const places = inputRef.current.getPlaces();
        if (places && places[0]) {
            const address = places[0].formatted_address;
            setData((prevData) => ({ ...prevData, address: address }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('data:' ,data);
            const { lat, lng } = await getLatLng(data.address);
            console.log('lat:', lat, 'lng:', lng);
            await axios.put('http://localhost:3001/api/editProfile', {data, lat: lat, lng: lng}, 
                { headers: { Authorization: `Bearer ${user.token}` } })
                .then((res) => {
                    console.log(res.data);

                    
                    onEditProfile(res.data);

                    const user = {Authorization: res.data.Authorization, user: res.data.user.firstName, email: res.data.user.email, address: res.data.user.address, lastName: res.data.user.lastName, id: res.data.user.id, lat: res.data.user.lat, lng: res.data.user.lng};
                    sessionStorage.setItem('user', JSON.stringify(user));
                    setEditing(false);
                });
        } catch (err) {
            const error = err.response.data.error;
            alert(error);
            console.error('Error editing profile:', err);
        }
    }

    return (
    
        <div className="profile">
            {!editing &&
            <div className='not-edit-profile'>
                <Navbar onLogout={onLogout}/>
                <div className='not-edit-profile-content'>
                    <h1>Profile</h1>
                    <img src={`https://api.multiavatar.com/${user.firstName}.png`} alt="profile-pic" style={{width: '100px', height: '100px'}}/>
                    <h2>First Name: {user.firstName}</h2>
                    <h2>Last Name: {user.lastName}</h2>
                    <h2>Email: {user.email}</h2>
                    <h2>Address: {user.address}</h2>
                    <button onClick={() => setEditing(true)}>Edit Profile</button>
                </div>
            </div>
            }
            {editing &&
                <div className="edit-profile">
                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit}>
                    <label>First Name:</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={data.firstName} 
                        onChange={handleChange} 
                    />

                    <label>Last Name:</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={data.lastName} 
                        onChange={handleChange} 
                    />

                    <label>Email:</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={data.email} 
                        onChange={handleChange} 
                    />

                    <label>Address:</label>
                    {isLoaded && (
                        <StandaloneSearchBox
                            onLoad={(ref) => (inputRef.current = ref)}
                            onPlacesChanged={handleOnPlacesChanged}
                        >
                            <input 
                                type="text" 
                                name="address" 
                                value={data.address} 
                                onChange={handleChange} 
                                required 
                            />
                        </StandaloneSearchBox>
                    )}

                    <button type="submit">Submit</button>
                </form>

                <button onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
            </div>


            }
            </div>
        
    );
}

export default Profile;