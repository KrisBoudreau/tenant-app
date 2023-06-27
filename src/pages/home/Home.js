import React from 'react'
import { Button } from '@mui/material'






export default function Home() {
  

  return (
    <Button 
      onClick={() => {
        const config = {
          Username: 'kris.boudreau68@gmail.com',
          Password: '109A2DD2DD5132B58560E7FA3B5EF11E284B',
          Host: 'smtp.elasticemail.com',
          Port: 2525,
          To : "kris.boudreau68@gmail.com",
          From : "kris.boudreau68@gmail.com",
          Subject : "This is the subject",
          Body : "And this is the body"
        }
      
     
         
        
      }} 
      sx={{border:3}}>




    </Button>
  )
}
