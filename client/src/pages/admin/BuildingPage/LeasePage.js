import React from 'react'
import { Button, Box, Typography, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from "../../../theme";
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { checkout } from '../../../actions/Actions'
import Buy from './Buy'


export default function LeasePage( {curLease, setDisplayLease} ) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [displayPayForm, setDisplayPayForm] = useState(false)
  const [refreshPayments, setRefreshPayments] = useState(false)

  const {register, handleSubmit } = useForm();


  return (
    <Box sx={{border: 1, m: 3, minHeight: 120}}>

      <Box justifyContent='space-between' display='flex' m={1} >

        <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" > 
        Lease  with tenant { curLease ? curLease.tenant_name : ''}
        </Typography>

        <IconButton onClick={() =>  setDisplayLease(false)}>
          <CloseIcon sx={{color: 'red'}}/>
        </IconButton>
      </Box>

      <Button 
        onClick={() => setDisplayPayForm(r => !r)}
        sx={{backgroundColor: colors.primary[400], m:1}}>
        <Typography sx={{color: colors.grey[100]}}>
          Add payment for this tenant
        </Typography>
      </Button>


      {/* <section>
        
        <Button sx={{backgroundColor: 'red'}} onClick={() => checkout()}>checkout</Button>
      </section> */}


      {displayPayForm &&
      <form onSubmit={handleSubmit(
        (data)=> {

          // axios.post(`http://localhost:3001/buildings`,{
          //     name: data.name,
          //     creator: curUser.name,
          //     insurance_email: 'none'
          //     }
          // );
          setDisplayPayForm(r => false);
          setRefreshPayments(r => !r);
        }
      )}>

        <label>
            Amount in cents
            <input type='number' {...register("amount")}/>
        </label>

        <input type="submit" value="submit"/>
      </form>
      }

      

      
        

    </Box>
  )
  
}
