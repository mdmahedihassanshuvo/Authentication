import React, { useRef, useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/solid'
import { GoogleAuthProvider, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import app from './firebase/firebase.config';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Login = () => {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    const passRef = useRef()
    const emailRef = useRef()

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const submitForm = (event) => {
        setError('')
        setSuccess('')
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setSuccess('Login Successful')
                setError('')
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
                setSuccess('')
            })
    }

    const resetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            setError('please provide your email address')
            return
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Swal.fire('Check your email to reset your password')
            })
    }

    const signInByGoogle = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                setError('')
                setSuccess('Login successful')
            })
            .catch(error => {
                setSuccess('')
                setError(error.message)
                console.log(error.message)
            })
    }

    return (
        <div>
            <h2 className='text-center text-3xl mt-5 font-bold'>Log in</h2>
            <form onSubmit={submitForm} className="max-w-md mx-auto mt-8 border rounded-md shadow-lg p-6">
                {/* <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        name='name'
                        placeholder="Enter your username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div> */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        ref={emailRef}
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
                    <button onClick={resetPassword} className='text-blue-600 underline'><span>forget password</span></button>
                </div>
                <p className='text-base mt-3 text-center font-medium'>Don't have any account .! please <Link className='text-blue-600' to='/register'>Register</Link></p>
                <div className='flex gap-2 mt-4 justify-center'>
                    <button onClick={signInByGoogle} className='flex items-center border p-1 rounded'><img className='w-6' src={`https://i.ibb.co/Lg9jVBr/google.png`} alt="" />google</button>
                    <button className='flex items-center border p-1 rounded'><img className='w-6' src={`https://i.ibb.co/zbWGvTj/facebook.png`} alt="" />facebook</button>
                    <button className='flex items-center border p-1 rounded'><img className='w-6' src={`https://i.ibb.co/Jn5qdKT/githun.png`} alt="" />github</button>
                </div>
                <p className='text-center text-blue-600 mt-2'>{success}</p>
                <p className='text-center text-blue-600 mt-2'>{error}</p>
            </form>
        </div>
    );
};

export default Login;