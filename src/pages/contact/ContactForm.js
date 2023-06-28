import React, { useState } from "react";
import axios from "axios";
import { Button } from '@mui/material'

export default function ContactForm() {
  const [recipient_email, setEmail] = useState('kristopher.boudreau@mail.mcgill.ca');
  const [subject, setSubject] = useState('subject here');
  const [message, setMessages] = useState('hello world');

  const sendMail = () => {

    console.log("Sending Email");

      axios
        .post("http://localhost:3001/send_email")
        .then(() => alert("Message Send Succesfuly"))
        .catch(() => alert("Oppssy daisssy"));

    }
  

  return (
    <Button sx={{backgroundColor: "red"}} onClick={sendMail}>jdmd</Button>
  )
  
}