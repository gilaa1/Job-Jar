import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from '../App';
import { useContext } from 'react';
import logo from '../assets/images/logo.png';
import '../styles/style.css';

const Navbar = ({ onLogout }) => {
    const user = useContext(UserContext);

    const activePageFunction = ({ isActive }) => (isActive ? "active-link" : "");

    return (
        <div className="navbar">
            <nav>
                <a className="logo" href="/main">
                    <img src={logo} alt="logo" />
                </a>

                <ul className="nav-links">
                    <li>
                        <NavLink 
                            to="/main"
                            className={activePageFunction}
                        >
                            Main
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/joblist"
                            className={activePageFunction}
                        >
                            Job List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/myjobs"
                            className={activePageFunction}
                        >
                            My Jobs
                        </NavLink>
                    </li>
                    <li>
                        <div className="nav-profile">
                            <NavLink 
                                to="/profile"
                                className={activePageFunction}
                            >
                                {user.firstName}
                                <img 
                                    src={`https://api.multiavatar.com/${user.firstName}.png`} 
                                    alt="profile-pic" 
                                    className="profile-pic" 
                                />
                            </NavLink>
                        </div>
                    </li>
                    <li>
                        <button className="logout-btn" onClick={onLogout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
