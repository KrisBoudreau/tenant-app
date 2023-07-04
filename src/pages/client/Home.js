import React from 'react'
import { useState, useEffect } from 'react'
import { fetchLeasesByEmail } from '../../actions/Actions';
import axios from 'axios'
import { Box } from '@mui/material'
import Header from '../admin/BuildingPage/Header';
import { useTheme } from '@emotion/react'
import { tokens } from '../../theme'



export default function Home( {curUser} ) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [leases, setLeases] = useState(null);


  useEffect(() => {


    


    fetchLeasesByEmail(curUser.email, setLeases);

  }, [])

  


  



  return (
    <Box m={2}>
      
      <Header title="My lease" />

      { leases === null ? null : 
      leases.map(l => {
        return (
        <Box sx={{backgroundColor: colors.primary[400], m:2}}>
          {l.tenant_name}
        </Box>
      )})

      }

      
      
      
    </Box>
  )
}
