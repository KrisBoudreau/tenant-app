import React from 'react'
import { Card, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { removeBuilding } from '../../../actions/Actions'


export default function BuildingCard( {curUser, name, id, setRefreshBuildings } ) {
  return (
    <Card sx={{margin: 2, backgroundColor: 'lightgoldenrodyellow', height: 70}}>

        <Typography >{ name }</Typography>
        
        <Link to={`/buildings/${id}`} style={{ textDecoration: 'none' }}>
            <Button>
                See building units
            </Button>  
        </Link>

        <Button sx={{border:1}} onClick={() => {
            removeBuilding(id);
            setRefreshBuildings(r => true);
        }}>
            remove Building
        </Button>
             

    </Card>
  )
}
