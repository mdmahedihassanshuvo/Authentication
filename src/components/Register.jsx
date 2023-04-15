import React, { useRef, useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/solid'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithPopup } from "firebase/auth";
import app from './firebase/firebase.config';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Register = () => {

    const auth = getAuth(app);

    const passRef = useRef()

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const submitForm = (event) => {
        event.preventDefault();
        setError('')
        setSuccess('')
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password);
        if (!/(?=.*?[A-Z])/.test(password)) {
            setError('Please inter a uppercase letter')
            return
        }
        else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            setError('Please inter a special character')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)
                setError('')
                event.target.reset()
                verifyEmail(result.user)
                setSuccess('Login successful...')
            })
            .catch(error => {
                setSuccess('')
                setError(error.message)
                console.log(error.message)
            })
    }

    const verifyEmail = (user) => {
        sendEmailVerification(user)
        Swal.fire('Send verification to your email')
    }

    return (
        <div>
            <form onSubmit={submitForm} className="max-w-md mx-auto mt-8 border rounded-md shadow-lg p-6">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        name='name'
                        placeholder="Enter your username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        placeholder="Enter your email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <div className="flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name='password'
                            ref={passRef}
                            placeholder="Enter your password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                            required
                        />
                        <button type="button" onClick={handleTogglePassword} className="absolute top-10 right-0 pr-3 flex items-center">
                            <span>{
                                showPassword ? <EyeIcon className="h-6 w-6 text-blue-500" /> :
                                    <EyeIcon className="h-6 w-6 text-blue-500" />
                            }</span>
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign Up
                    </button>
                </div>
                <p className='text-base mt-3 text-center font-medium'>Already have an account .! please <span className='text-blue-600 underline'><Link to="/login">Login</Link></span></p>
                {/* <div className='flex gap-2 mt-4 justify-center'>
                    <button onClick={signInByGoogle} className='flex items-center border p-1 rounded'><img className='w-6' src={`https://i.ibb.co/Lg9jVBr/google.png`} alt="" />google</button>
                    <button className='flex items-center border p-1 rounded'><img className='w-6' src={`https://i.ibb.co/zbWGvTj/facebook.png`} alt="" />facebook</button>
                    <button className='flex items-center border p-1 rounded'><img className='w-6' src={`https://i.ibb.co/Jn5qdKT/githun.png`} alt="" />github</button>
                </div> */}
                <p className='text-center text-blue-600 mt-2'>{success}</p>
                <p className='text-center text-blue-600 mt-2'>{error}</p>
            </form>
        </div>
    );
};

export default Register;