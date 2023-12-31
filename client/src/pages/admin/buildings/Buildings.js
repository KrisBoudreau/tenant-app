import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetchBuildings } from  '../../../actions/Actions'
import BuildingCard from './BuildingCard'
import BuildingForm from './BuildingForm'
import { Button, Typography, Box } from '@mui/material'
import { useTheme } from '@emotion/react'
import { tokens } from '../../../theme'
import { color } from '@mui/system'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'



export default function Buildings( {curUser} ) {

  const [refreshBuildings, setRefreshBuildings] = useState(false);
  const [buildings, setBuildings] = useState('none');
  const [displayBuildingForm, setDisplayBuildingForm] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //get buildings
  useEffect(() => { 
    fetchBuildings(setBuildings);
    setRefreshBuildings(r => false);
  }, [refreshBuildings])
  if (buildings === 'none'){
    return <HourglassTopIcon />
  }


  return (
    <Box >
      

      <Button 
        sx={{
          backgroundColor: colors.primary[400],
          '&:hover': {
            backgroundColor: colors.primary[300],
          },
          margin: 4
        }}
        onClick={() => {
          setDisplayBuildingForm(r => !r);
      }}>
        <Typography color={colors.grey[100]}  >
          Add building
        </Typography>
      </Button>
      

      {displayBuildingForm ? <BuildingForm 
        curUser={curUser}
        setRefreshBuildings={setRefreshBuildings}
        setDisplayBuildingForm={setDisplayBuildingForm}/> : ''}



      { buildings.map(building => {
          return (
            <BuildingCard 
              curUser={curUser} 
              name={building.name} 
              id={building._id} 
              setRefreshBuildings={setRefreshBuildings}/>
          )
      })}

      




    </Box>

  )
}
