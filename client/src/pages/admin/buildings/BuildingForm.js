import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react'
import { tokens } from '../../../theme'

export default function BuildingForm( {
    curUser, 
    setRefreshBuildings, 
    setDisplayBuildingForm} ) {

    const {register, handleSubmit } = useForm();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{
            backgroundColor: colors.primary[400]
        }}>
            Building Form
            <form onSubmit={handleSubmit((data)=> {
                axios.post(`http://localhost:3001/buildings`,{
                    name: data.name,
                    creator: curUser.name,
                    insurance_email: 'none'
                    }
                );
                setRefreshBuildings(r => true);
                setDisplayBuildingForm(r => !r);
                }
            )}>

                <label>
                    Building name
                    <input {...register("name")}/>
                </label>

                <input type="submit" value="submit"/>
            </form>

                
        </Box>
    )
}

