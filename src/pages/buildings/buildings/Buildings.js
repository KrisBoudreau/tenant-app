import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetchBuildings } from  '../../../actions/Actions'
import BuildingCard from './BuildingCard'
import BuildingForm from './BuildingForm'
import { Button } from '@mui/material'



export default function Buildings( {curUser} ) {

  const [refreshBuildings, setRefreshBuildings] = useState(false);
  const [buildings, setBuildings] = useState('none');
  const [displayBuildingForm, setDisplayBuildingForm] = useState('none');

  //get buildings
  useEffect(() => { 
    fetchBuildings(setBuildings);
    setRefreshBuildings(r => false);
    
  }, [refreshBuildings])
  if (buildings === 'none'){
    return <h1>loading</h1>
  }


  return (
    <div>
      

      <Button onClick={() => {
        setDisplayBuildingForm(r => !r);

      }}>Add building</Button>

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

      




    </div>

  )
}
