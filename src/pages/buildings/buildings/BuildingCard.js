import React from 'react'
import { Card, Typography, Button, useTheme, Box } from '@mui/material'
import { Link } from 'react-router-dom';
import { removeBuilding } from '../../../actions/Actions'
import { tokens } from '../../../theme';
import { green } from '@mui/material/colors';
import { flexbox } from '@mui/system';



export default function BuildingCard( {curUser, name, id, setRefreshBuildings } ) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (


    <Box display="flex" justifyContent="space-evenly">
        <Link to={`/buildings/${id}`} style={{ textDecoration: 'none'}}>
        <Card sx={{
            marginY: 2.5, 
            marginX: 4,
            width: 1,
            
            height: 70,
            backgroundColor: colors.primary[400],
            
        }}>
            
            

            <Typography align="center" variant="h4" 
            >{ name }</Typography>
            

            

                     

        </Card>
        </Link>
        
    
    <Button sx={{
        backgroundColor: colors.primary[300],
        marginX: 4
    }} onClick={() => {
        removeBuilding(id);
        setRefreshBuildings(r => true);
    }}>
        remove Building
    </Button>

    </Box>
  )
}
