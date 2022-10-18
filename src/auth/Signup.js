import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import Footer from "../components/Footer";
import { getDatabase, ref, set } from "firebase/database";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from
    "react-hook-form";

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { user, createUser } = UserAuth();
    let navigate = useNavigate();


    const handleCreateUser = async () => {
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

    const SignUpSchema = yup.object().shape({
        firstName: yup.string().min(2, "First Name must contain 2-15 characters").max(15).required(),
        lastName: yup.string().min(2, "Last Name must contain 2-15 characters").max(15).required(),
        email: yup.string().email("You have entered an invalid email. Please try again.").required("Email is required!"),
        password: yup.string().min(4).max(20).required(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SignUpSchema)
    })


    useEffect(() => {
        if (user != null) {
            writeUserData(user.uid, firstName, lastName, email)
            navigate('/')
        }
        return () => {
        };
    }, [user]);

    return (
        <div className='container_signup'>

            <form id="form_cover" onSubmit={handleSubmit(handleCreateUser)}>
                <h2>Sign Up</h2>

                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type='text' placeholder="Enter Your First Name..."
                        {...register("firstName")}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <span>{errors.firstName?.message}</span>
                </div>

                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type='text' id="lastName" name="lastName" placeholder="Enter Your Last Name..."
                        {...register("lastName")}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <span>{errors.lastName?.message}</span>

                </div>

                <div className="input-field">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" placeholder="Enter Your Email Address..."
                        {...register("email")}
                        onChange={e => setEmail(e.target.value)} />
                    <span>{errors.email?.message}</span>
                </div>

                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name="password" placeholder="Enter Your Password..."
                        {...register("password")}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>{errors.password?.message}</span>
                </div>

                <div className="input-field">
                    {/* <Button id="formBtn" onClick={handleCreateUser}>Sign Up</Button> */}
                    <input type="submit" value="Sign Up" />
                    <p>Already have an account yet?<Link to='/signup'> Sign In.</Link></p>
                </div>
            </form>
            <Footer />
        </div >);
}

export default Signup;