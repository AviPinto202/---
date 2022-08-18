import { useState, useEffect, componentDidMount } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserAuth } from '../context/AuthContext';
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";


const Navbar = () => {
    const [UserData, setUserData] = useState();
    const { user, logOut } = UserAuth();

    const HandlerSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error)
        }
    }

    const readUserData = async (userId) => {
        const dbRef = ref(getDatabase());
        await get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUserData(snapshot.val());
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const smoothScroll = () => {
        window.scrollTo({ top: 900, behavior: 'smooth' })
    }

    useEffect(() => {
        if (user != null) {
            readUserData(user.uid)
        }
    }, [user]);



    return (
        <div className="container">
            <div className="left-side">
                <Link to={'/'}><h1 id='logo'>Plan My Day</h1></Link>
                <ul>
                    <Link to={`/myplans/${user.uid}`}><li>My Plans</li></Link>
                    <Link to={'/'}><li onClick={smoothScroll}>About</li></Link>
                    <Link to={'/'}><li>Contact Us</li></Link>

                </ul>
            </div>
            <div className="right-side">
                {user && UserData ?
                    <div className='islogin'>
                        <h3 id='userDetails'>Hello {UserData.firstName + ' ' + UserData.lastName}</h3>
                        <LogoutIcon id="logoutIcon" size={30} onClick={HandlerSignOut}></LogoutIcon>
                    </div>
                    :
                    < Link to={'/signin'}><Button id="loginBtn" variant="outlined">Login</Button></Link>

                }
            </div>
        </div >
    );
}

export default Navbar;