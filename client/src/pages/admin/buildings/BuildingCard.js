import React from 'react'
import { Card, Typography, Button, useTheme, Box } from '@mui/material'
import { Link, redirect } from 'react-router-dom';
import { removeBuilding } from '../../../actions/Actions'
import { tokens } from '../../../theme';
import EmailIcon from '@mui/icons-material/Email';
import Fab from '@mui/material/Fab';
import { green, red, blue } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { display } from '@mui/system';



export default function BuildingCard( {curUser, name, id, setRefreshBuildings } ) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (


    <Box display="flex" >
        
        
        <Card sx={{
            marginY: 2.5, 
            marginX: 4,
            width: 1,
            height: 70,
            backgroundColor: colors.primary[400], 
            display: 'flex',
            justifyContent: 'space-between',
            
            
        }}>
            
            <Typography sx={{m:2}} variant="h2"  
            >{ name }</Typography>

            <Box sx={{m: 2}}>
        
            <Link to={`/buildings/${id}`} style={{ textDecoration: 'none'}}>
            <Fab
                color="primary"
                sx={{
                    marginRight:1,
                    width: 40,
                    height: 40,
                    bgcolor: colors.primary[400],
                    '&:hover': { bgcolor: blue[600] },
            }}>
                <VisibilityIcon />
            </Fab>
            </Link>
            <Link to={`/mail/${id}`} style={{ textDecoration: 'none'}}>
            <Fab
                color="primary"
                sx={{
                    marginRight:1,
                    width: 40,
                    height: 40,
                    bgcolor: colors.primary[400],
                    '&:hover': { bgcolor: green[700] },
            }}>
                <EmailIcon />
            </Fab>
            </Link>

            <Fab
                color="primary"
                sx={{
                width: 40,
                height: 40,
                bgcolor: colors.primary[400],
                '&:hover': { bgcolor: red[500] },
                }}
                onClick={() => {
                    alert('this button disabled for now')
                    // removeBuilding(id);
                    // setRefreshBuildings(r => true);
                }}
            >
                <DeleteIcon />
            </Fab>
            
            </Box>

        </Card>
 

    
        
    
    </Box>
  )
}
