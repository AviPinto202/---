import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import { getDatabase, ref, set } from "firebase/database";


const Signin = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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

    // const splitFullName = (fullName) => {
    //     const arr = fullName.split(" ")
    //     let firstName1 = arr[0];
    //     let lastName1 = arr[1];
    //     setFirstName('avi') /// not set the strings
    //     setLastName(lastName1) /// לסדר את זה
    //     console.log("first name" + arr[0], "last name" + arr[1])
    //     console.log("first name" + firstName, "last name" + lastName)
    // }

    const writeUserData = (userId, firstName, lastName, email) => {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            firstName: firstName,
            lastName: lastName,
            email: email,
        }).then(() => { alert('User successfully created') })
            .catch((error) => { alert('error' + error) });
    }

    useEffect(() => {
        if (user != null) {
            const arr = user.displayName.split(" ")
            //setFirstName(arr[0])
            //setLastName(arr[1])
            writeUserData(user.uid, arr[0], arr[1], user.email)
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