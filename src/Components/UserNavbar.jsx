// src/components/Navbar.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-between items-center">
                <div className="text-white text-lg">Dreams Day's Rentals</div>
                <button
                    onClick={handleLogout}
                    className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
