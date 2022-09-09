import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import { getDatabase, ref, set } from "firebase/database";


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { SignIn, googleSignIn, user } = UserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await SignIn(email, password)
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    };

    const handlerGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }

    const writeUserData = (userId, fullName, email) => {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            fullName: fullName,
            email: email,
        }).then(() => { alert('User successfully created') })
            .catch((error) => { alert('error' + error) });
    }

    useEffect(() => {
        if (user != null) {
            writeUserData(user.uid, user.displayName, user.email)
            navigate('/')
        }
        return () => {
        };
    }, [user]);

    return (
        <div className='container_signin'>
            <form id='form_cover' onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <div className="input-field">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id='email' placeholder='Enter Your Email...'
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' placeholder='Enter Your Password..' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="input-field">
                    <Button id="formBtn" onClick={handleSubmit}>Login</Button>
                    <p>Or sign in with</p>
                    <FcGoogle size={30} onClick={handlerGoogleSignIn} style={{ cursor: "pointer" }} />
                    <p>Don't have an account yet?<Link to='/signup'> Sign Up.</Link></p>
                </div>
            </form >
            <Footer />
        </div >
    );
}

export default Signin;