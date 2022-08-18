import { useState, useEffect } from 'react';
import About from "../components/About";
import { Button } from "@mui/material";
import bgImg from "../images/laptop_img2.jpg";
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Home = () => {

    const { user } = UserAuth();

    useEffect(() => {
        console.log(user.uid)
        return () => {
        };
    }, []);

    return (
        <div className="container">
            <div className="foreword">
                <img id="bgImg" src={bgImg} alt=""></img>
                <div className="foreword_details">
                    <h1>Get your day in order.</h1>
                    <p>The tool that will help you organize your schedule for the coming days.</p>
                    {!user ? <Link style={{ display: 'contents' }} to="/signin"><Button id="startBtn">Start Now</Button></Link> :
                        <Link style={{ display: 'contents' }} to={`/myplans/${user.uid}`}><Button id="startBtn">Start Now</Button></Link>}

                </div>
            </div>
            <About />
            <Footer />
        </div >
    );
}

export default Home;