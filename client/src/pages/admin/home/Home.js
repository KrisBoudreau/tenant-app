import React from 'react'
import { useState, useEffect } from 'react'

import { fetchBuildings } from  '../../../actions/Actions'

import { Typography, Box, Card, Grid, Paper } from '@mui/material'
import { useTheme } from '@emotion/react'
import { tokens } from '../../../theme'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import { styled } from '@mui/material/styles';
import { fetchAllUnits } from '../../../actions/Actions'
import Fab from '@mui/material/Fab';
import moment from 'moment'








export default function Home( {curUser} ) {


  const [buildings, setBuildings] = useState('none');
  const [leaseExpireAmount, setLeaseExpireAmount] = useState(6);
  const [units, setUnits] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  //get buildings
  useEffect(() => { 
    fetchBuildings(setBuildings);
    fetchAllUnits(setUnits); 
    
  }, [])
  if (buildings === 'none')return <HourglassTopIcon />;


  return (
    <Box >

      <Typography variant="h1" m={4}>DashBoard</Typography>
      

      { buildings.map(building => { return (
        <Card sx={{
          m: 3,
          height: 90,
          backgroundColor: colors.primary[400], 
          display: 'flex'
        }}>

          <Typography 
            variant="h3" 
            m={2} 
            alignSelf={'center'}
            width={'15%'}
          >
            {building.name}
          </Typography>

          <Grid container spacing={3}   alignItems={'center'} marginX={3} >
            <Grid item xs={4} >
            <Card sx={{minHeight: 50}}>
              <Typography mX={1}>Units with Lease Expiring</Typography>   
              <Grid container spacing={2}>
                {units && units.map(unit => { 
                  if (
                    unit.building_id == building._id &&
                    (moment(unit.end_of_lease) - moment())/(1000*60*60*24) < 180) {
                  return(
                  <Grid item xs={2}>
                    {unit.unit_number}
                  </Grid>
                )}})}
              </Grid>
            </Card> 
            </Grid>  

            <Grid item xs={4}>
            <Card sx={{minHeight: 50}}>
              Units with Insurance Expiring
              <Grid container spacing={2}>
                {units && units.map(unit => { 
                  if (unit.building_id == building._id &&
                    (moment(unit.end_of_insurance) - moment())/(1000*60*60*24) < 180 ) {
                    return(
                    <Grid item xs={2}>     
                        {unit.unit_number}
                    </Grid>
                )}})}
              </Grid>
            </Card>        
            </Grid>  
            <Grid item xs={4}>
            <Card sx={{minHeight: 50}}>
              Vacant Units
              <Grid container spacing={2}>
                {units && units.map(unit => { 
                  if (unit.building_id == building._id && unit.vacant) {
                    return(
                    <Grid item xs={2}>                
                      {unit.unit_number}
                    </Grid>
                )}})}
              </Grid>
            </Card>
            </Grid> 
          </Grid>

        </Card>  
      )})}

      




    </Box>

  )
}