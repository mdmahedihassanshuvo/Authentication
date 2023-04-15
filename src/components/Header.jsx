import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='h-14 mx-40 flex justify-between items-center'>
            <h2 className='text-3xl font-bold'>Authentication</h2>
            <nav className='text-black'>
                <ul className='flex gap-4'>
                    <li className='text-xl'>
                        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600" : ""}>
                            Home
                        </NavLink>
                    </li>
                    <li className='text-xl'>
                        <NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-600" : ""}>
                            Sing in
                        </NavLink>
                    </li>
                    <li className='text-xl'>
                        <NavLink to="/register" className={({ isActive }) => isActive ? "text-blue-600" : ""}>
                            Sign up
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;