import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import moment from 'moment';

const ContactForm = () => {
  const form = useRef();
  console.log(emailjs);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('contact_service', 'contact_form', form.current, 'z_XQkle-XnwZbpwEP')
      .then((result) => {
          console.log(form.current);
      }, (error) => {
          console.log(error.text);
      });
    
  };

  const sendE = () => {
    emailjs.send('contact_service', 'contact_form', {
      user_email: 'kris.boudreau68@gmail.com', 
      message: 'this is message that will be sent rn',
      subject: 'this is subject'}, 
    'z_XQkle-XnwZbpwEP')
    .then((result) => {
      console.log('success');
    }, (error) => {
        console.log('fail');
    });

  }

  
  
  //sendE();

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Subject</label>
      <input type="text" name="subject" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactForm;