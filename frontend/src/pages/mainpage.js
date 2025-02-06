import React from 'react';
import { UserContext } from '../App';
import { useContext } from 'react';
import Navbar from '../components/Navbar';
import PostJob from '../components/PostJob';
import JumpGame from '../components/JumpGame';
import DeliveryGame from '../components/DeliveryGame';

const MainPage = ({onLogout, onAddJob}) => {
    const user = useContext(UserContext);
    
    return (
        <div className='mainpage'>
            <Navbar onLogout={onLogout}/>
            <div className='mainpage-content'>
                <h2>Hi {user?.firstName} (:</h2>
                <h1>Welcome to Job-Jar!</h1>
                <PostJob onAddJob = {onAddJob}/>
            </div>
        </div>
    );
};

export default MainPage;
