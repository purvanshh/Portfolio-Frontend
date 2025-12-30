import React, { useRef, useEffect } from 'react';
import './ContactFormStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import cartoon from '../images/Cartoon Background Removed.png';
import ShineButton from './ui/ShineButton';

// ⚠️ IMPORTANT: Replace these with YOUR EmailJS credentials from https://dashboard.emailjs.com
const EMAILJS_PUBLIC_KEY = '22Z-TjhaCZ7FS8IM7';  // Account → General → Public Key
const EMAILJS_SERVICE_ID = 'service_ugvpczp';    // Email Services → Your service ID
const EMAILJS_TEMPLATE_ID = 'template_lyzbf0p';  // Email Templates → Your template ID

export default function ContactForm({ id }) {
  const form = useRef();

  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current)
      .then((result) => {
        console.log('SUCCESS:', result.text);
        toast.success('Message sent successfully.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // Clear form after successful submission
        form.current.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        toast.error("Failed to send message. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };




  return (
    <div className='contact-window' id={id}>
      <h1>Let's Get in Touch.</h1>
      <p>Discuss a project or just want to say Hi? My inbox is open for all. Connect with me on LinkedIn</p>
      <div className="contact-container">
        <img src={cartoon} alt='Purvansh' className="contact-wrapper-left"></img>
        <form ref={form} onSubmit={sendEmail} className="contact-wrapper-right">
          <input id='name' type="text" name="name" placeholder='Full Name' required />
          <input id='email' type="email" name="email" placeholder='Email ID' required />
          <textarea id='message' name="message" rows='5' column='15' placeholder='Share your thoughts and insights here; your feedback means a lot.' required />
          <ShineButton
            label="Send Message"
            size="lg"
            type="submit"
            bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
            className="contact-submit-btn"
          />
          <ToastContainer />
        </form>

      </div>
    </div>
  )
}