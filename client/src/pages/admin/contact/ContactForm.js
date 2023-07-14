import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import moment from 'moment';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { fetchEmails, fetchBuilding } from '../../../actions/Actions';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Box, Button, Card } from '@mui/material';
import { useTheme } from '@emotion/react'
import { tokens } from '../../../theme'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import { red, blue } from '@mui/material/colors';
import { removeEmail } from '../../../actions/Actions';
import SendIcon from '@mui/icons-material/Send';




const ContactForm = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {register, handleSubmit } = useForm();

  const [ emails, setEmails ] = useState(false);
  const [building, setBuilding] = useState('none')
  const [refreshEmails, setRefreshEmails] = useState(false);
  const [displayTestEmail, setDisplayTestEmail] = useState(false)
  const [displayEmailForm, setDisplayEmailForm] = useState(false);
  const [fullName, setFullName] = useState('ss');

  
  const { id } = useParams();
  const form = useRef();

  //get info for this page
  useEffect(() => {
    fetchEmails(id, setEmails);
    fetchBuilding(id, setBuilding);
    setRefreshEmails(false)

  }, [refreshEmails])



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

  return (
    <div>
      
      <Typography variant="h1" m={2} >{building === 'none' ? 'null'  : <div>{building.name}</div>}
      </Typography>

      <Button 
        sx={{
          backgroundColor: colors.primary[400],
          '&:hover': {
            backgroundColor: colors.primary[300],
          },
          m: 3
        }}
        onClick={() => {
          setDisplayEmailForm(r => !r);
      }}>
        <Typography color={colors.grey[100]}  >
          Create an email template
        </Typography>
      </Button>

      <Box sx={{
        backgroundColor: colors.primary[400]
      }}>
        {displayEmailForm && 
        <form onSubmit={ handleSubmit((data)=> {
          axios.post(`http://localhost:3001/buildings/${id}/mail`,{
            title: data.title,
            subject: data.subject,
            body: data.body,
            send_instructions: data.send_instructions
            }
          ).then(() => {
            setRefreshEmails(true);
            setDisplayEmailForm(false);
          }); 
        })}>
          <label>
            Title
            <input {...register("title")}/>
          </label>
          <label>
            Subject
            <input {...register("subject")}/>
          </label>
          <label>
            Message
            <input {...register("body")}/>
          </label>
          <label>
            Send Instructions
            <input {...register("send_instructions")}/>
          </label>

          <input type="submit" value="submit"/>
        </form>}
               
      </Box>


      {emails && emails.map(email => {return (
        <Accordion 
        sx={
          {backgroundColor: colors.primary[400],
          border: 1,
          m: 3
        }}>

          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box sx={{display: 'flex', 
            justifyContent: 'space-between', 
            width: '90%'}}>
            <Typography variant='h3' display='flex'>{email.title}</Typography>
            <Typography variant='h6' display='flex'>{email.send_instructions}</Typography>
            </Box>



          </AccordionSummary>


          <AccordionDetails>
          {email.subject}
          <br/>
          <br/>

         

          {email.body}
          

          </AccordionDetails>

          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>


            <Button 
              onClick={() => setDisplayTestEmail(r => !r)} 
              sx={{
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                m:2,
                '&:hover': { bgcolor: blue[800] },
              
              }}>
              Send Test Email
              <SendIcon sx={{m:1}}/>
            </Button>

            <Fab
              color="primary"
              sx={{
              width: 40,
              height: 40,
              m: 2,
              bgcolor: colors.primary[400],
              '&:hover': { bgcolor: red[500] },
              }}
              onClick={() => {
                removeEmail(id, email._id);
                setRefreshEmails(true)  
              }}
            >
              <DeleteIcon />
            </Fab>
          </Box>

          

          {displayTestEmail && 
            <form onSubmit={handleSubmit((data)=> {
              emailjs.send('contact_service', 'contact_form', {
                user_email: data.email, 
                message: email.body,
                subject: email.subject}, 
              'z_XQkle-XnwZbpwEP')
              .then((result) => {
                console.log('success');
                setDisplayTestEmail(false)
              }, (error) => {
                  console.log('fail');
              });
            })}>
              <label>
                send this to which email?
                <input {...register("email")}/>
              </label>
                
              <input type="submit" value="send"  />
            
            </form>  
          }
        </Accordion>
      )})}
      
    </div>
  );
};

export default ContactForm;