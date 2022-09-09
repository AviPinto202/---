import { Button } from "@mui/material";
import emailjs from '@emailjs/browser';
import { useRef } from "react";


const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_PlanMyDay', 'template_PlanMyDay', form.current, '_jEhWEPUHUr4bTV4v')
            .then((result) => {
                window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <div className="container_contactUs">
            <h1>Contact Us</h1>
            <div className="contactUs_content">
                <h2>Talk with us for any issue</h2>
                <form className="contactUs_form" ref={form} onSubmit={sendEmail}>
                    <label htmlFor="contactUs_input">Enter Your Name</label>
                    <input type="text" placeholder="Enter Your Name..." name="user_name" on></input>
                    <label htmlFor="femail">Enter Your Email</label>
                    <input type="email" placeholder="Enter Your Email..." name="user_email" ></input>
                    <label htmlFor="">Your Content</label>
                    <textarea type="text" placeholder="Enter Your Content..." rows="4" cols="50" id="contactus_ta" name="message">
                    </textarea>
                    <Button variant="contained" id="contactus_btn" onClick={sendEmail}>Sumbit</Button>
                </form>
            </div>
        </div>

    );
}

export default ContactUs;