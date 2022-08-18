import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import Footer from "../components/Footer";
import { getDatabase, ref, set } from "firebase/database";

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { user, createUser } = UserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await createUser(email, password)
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

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
            navigate('/')
            writeUserData(user.uid, firstName, lastName, email)
        }
        return () => {
        };
    }, [user]);

    return (
        <div className='container_signup'>
            <form id="form_cover" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id='firstName' placeholder="Enter Your First Name..."
                        onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id='lastName' placeholder="Enter Your Last Name..."
                        onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="input-field">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id='email' placeholder="Enter Your Email Address..."
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' placeholder="Enter Your Password..."
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="input-field">
                    <Button id="formBtn" onClick={handleSubmit}>Sign Up</Button>
                    <p>Already have an account yet?<Link to='/signup'> Sign In.</Link></p>
                </div>
            </form>
            <Footer />
        </div >);
}

export default Signup;