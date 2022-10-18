import { Button } from "@mui/material";
import emailjs from '@emailjs/browser';
import { useState, useRef } from "react";
// import FormInput from "./FormInput";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from
    "react-hook-form";

const ContactUs = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");

    const form = useRef();

    const ContactUsSchema = yup.object().shape({
        fullName: yup.string().min(3, "Full Name must contain 3-25 characters").max(25).required("Full Name is required!"),
        email: yup.string().email("You have entered an invalid email. Please try again.").required("Email is required!"),
        content: yup.string().min(5, "Content must be at least 5 characters").max(100).required("Content is required!")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ContactUsSchema)
    })

    const sendEmail = (event) => {
        console.log("send mail")
        emailjs.sendForm('service_PlanMyDay', 'template_PlanMyDay', form.current, '_jEhWEPUHUr4bTV4v')
            .then((result) => {
                window.location.reload()
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
                <form className="contactUs_form" onSubmit={handleSubmit(sendEmail)}>
                    <label htmlFor="contactUs_input">Enter Your Name</label>
                    <input type="text" placeholder="Enter Your Full Name..." name="fullName"
                        {...register("fullName")} onChange={(e) => setEmail(e.target.value)} />
                    <span>{errors.fullName?.message}</span>
                    <label htmlFor="femail">Enter Your Email</label>
                    <input type="email" placeholder="Enter Your Email..." name="email"
                        {...register("email")} onChange={(e) => setFullName(e.target.value)} />
                    <span>{errors.email?.message}</span>
                    <label htmlFor="">Your Content</label>
                    <textarea placeholder="Enter Your Content..." rows="4" cols="50" id="contactus_ta" name="message"
                        {...register("content")} onChange={(e) => setContent(e.target.value)} />
                    <span>{errors.content?.message}</span>
                    <input type="submit" value="Submit" />
                    {/* <Button variant="contained" id="contactus_btn">Sumbit</Button> */}
                </form>
            </div>
        </div >

    );
}

export default ContactUs;