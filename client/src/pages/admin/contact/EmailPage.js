import React from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@emotion/react'
import { tokens } from '../../../theme'
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { fetchBuildings } from  '../../../actions/Actions'
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';






export default function EmailPage() {

  const Item = styled(Paper)(() => ({
    backgroundColor: colors.primary[400],
    // textAlign: 'center',
    color: colors.grey[100],
    minHeight: '80px'
  }));

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [buildings, setBuildings] = useState(false);

   //get buildings
   useEffect(() => { 
    fetchBuildings(setBuildings);
  }, [])



  
  return (
    <Box sx={{ flexGrow: 1, m:8 }}>

      <Grid container spacing={3}>

        {buildings && buildings.map(building => {
          return (
            <Grid item xs={6}>
              <Item>
                
                <Box display='flex' justifyContent='space-between'>
                <Typography variant='h2' m={4}> {building.name} </Typography>

                <Link to={`/mail/${building._id}`} style={{ textDecoration: 'none'}}>
                  <Fab
                  color="primary"
                  sx={{
                      m:3,
                      width: 60,
                      height: 60,
                      bgcolor: colors.primary[400],
                      '&:hover': { bgcolor: green[700] },
                  }}>
                    <MailIcon />
                  </Fab>
                </Link>
                </Box>
              </Item>
              
            </Grid>
        )})}


        
        
      </Grid>
      
    </Box>

  )
}
