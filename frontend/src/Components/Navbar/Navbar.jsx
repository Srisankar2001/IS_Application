import React, { useEffect } from 'react'
import "./Navbar.css"
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const { logout } = useAuth0();

    return (
        <div className='navbar'>
            <ul className='navbar-left'>
                <li>
                    <Link to="/">Profile</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/booking">Bookings</Link>
                </li>
            </ul>
            <ul className='navbar-right'>
                <li>
                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                        Log Out
                    </button>
                </li>
            </ul>
        </div>
    )
}
