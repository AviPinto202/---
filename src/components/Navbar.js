import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserAuth } from '../context/AuthContext';
import { getDatabase, ref, child, get } from "firebase/database";
import Hamburger from './Hamburger';


const Navbar = () => {
    const [UserData, setUserData] = useState();
    const [openHamburger, setOpenHamburger] = useState(false);
    const { user, logOut } = UserAuth();

    let navigate = useNavigate()

    const HandlerSignOut = () => {
        try {
            logOut()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const readUserData = async (userId) => {
        const dbRef = ref(getDatabase());
        await get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUserData(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const smoothScrollToAbout = () => {
        window.scrollTo({ top: 900, behavior: 'smooth' })
    }

    const smoothScrollToContactUs = () => {
        window.scrollTo({ top: 1250, behavior: 'smooth' })
    }

    const toggleHambuger = () => {
        setOpenHamburger(!openHamburger);
    }

    useEffect(() => {
        if (user != null) {
            readUserData(user.uid)
        }
    });

    return (
        <div className="container">
            <div className="left-side">
                <Link to={'/'}><h1 id='logo'>Plan My Day</h1></Link>
                <ul>
                    {user ?
                        <Link to={`/myplans/${user.uid}`}><li>My Plans</li></Link> :
                        <Link to={`/signin`}><li>My Plans</li></Link>
                    }
                    <Link to={'/'}><li onClick={smoothScrollToAbout}>About</li></Link>
                    <Link to={'/'}><li onClick={smoothScrollToContactUs}>Contact Us</li></Link>
                </ul>
            </div>

            <div className="right-side">
                {user && UserData ?
                    <div className='islogin'>
                        {/* {UserData.firstName !== undefined ? */}
                        <Link to={`/profile/${user.uid}`}>
                            <h3 id='userDetails'>Hello {UserData.firstName + ' ' + UserData.lastName}</h3>
                        </Link>
                        {/* :
                            <Link to={`/profile/${user.uid}`}><h3 id='userDetails'>Hello {UserData.fullName}</h3></Link>
                        } */}
                        <LogoutIcon id="logoutIcon" size={30} onClick={HandlerSignOut}></LogoutIcon>
                    </div>
                    :
                    < Link to={'/signin'}><Button id="loginBtn" variant="outlined">Login</Button></Link>
                }
            </div>


            {/* responsive menu */}
            <div className="hamburger_menu" onClick={toggleHambuger}>
                <Hamburger />
            </div>

            <style jsx="true">{`
            @media only screen and (min-width: 360px) and (max-width: 965px){
            .left-side ul {
                display: ${openHamburger ? 'flex' : 'none'};
                flex-direction: column;
                justify-content: space-evenly;
                background-color: #a8dadc;
                position: absolute;
                top: 9vh;
                right: 0vw;
                height: 14vh;
                width: 100%;
                z-index: 5;
            }

            .right-side {
                display: ${openHamburger ? 'flex' : 'none'};
                flex-direction: column;
                align-items: center;
                position: absolute;
                top: 24vh;
                background-color: #a8dadc;
                width: 100%;
                height: 10vh;
                z-index: 5;
                -webkit-box-shadow: 0px 5px 5px 0px rgb(0 0 0 / 15%);
                -moz-box-shadow: 0px 5px 5px 0px rgb(0 0 0 / 15%);
                box-shadow: 0px 5px 5px 0px rgb(0 0 0 / 15%);
              }

              .islogin{
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin: 0;
              }
            }`}
            </style>
        </div >
    );
}

export default Navbar;