import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetchBuildings } from  '../../actions/Actions'

export default function Buildings() {

  const [refreshBuildings, setRefreshBuildings] = useState(false);
  const [buildings, setBuildings] = useState('none');

  //get buildings
  useEffect(() => { 
    fetchBuildings(setBuildings);
    setRefreshBuildings(r => false);
    console.log(buildings);
  }, [refreshBuildings])
  if (buildings === 'none'){
    return <h1>loading</h1>
  }

  console.log(buildings);



  return (
    <div>
      Buildings

      




    </div>

  )
}
