import React from 'react'
import { Button, Box, Typography, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from "../../../theme";
import { IconButton } from '@mui/material';


export default function LeasePage( {curLease, setDisplayLease} ) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{border: 1, m: 3}}>

      <Box justifyContent='space-between' display='flex' m={1} >

        <Typography variant="h2" color={colors.grey[100]} fontWeight="bold"> 
        Lease  with tenant { curLease ? curLease.tenant_name : ''}
        </Typography>

        <IconButton onClick={() =>  setDisplayLease(false)}>
          <CloseIcon sx={{color: 'red'}}/>
        </IconButton>
      </Box>
      

      
        

    </Box>
  )
  
}
