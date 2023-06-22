import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import UnitForm from './UnitForm'
import { Button, Card, Typography } from '@mui/material';
import { fetchUnits, fetchBuilding } from '../../../actions/Actions'
import Unit from './Unit'

export default function BuildingPage( {curUser} ) {

    let { id } = useParams();

    const [displayUnitForm, setDisplayUnitForm] = useState(false);
    const [refreshUnits, setRefreshUnits] = useState(false);
    const [units, setUnits] = useState('none');
    const [building, setBuilding] = useState('none');


    useEffect(() => {
        fetchUnits(id, setUnits);
        fetchBuilding(id, setBuilding);
        setRefreshUnits(r => false);

    }, [refreshUnits])


    if (units == 'none' ) return <div>Loading...</div>
    if (building == 'none' ) return <div>Loading...</div>
    


    return (
        <div>
            <Typography variant="h5" sx={{margin: 2}}>{building.name}</Typography>

            <Button onClick={() => setDisplayUnitForm(r => !r)}>Add Unit</Button>

            {displayUnitForm ? <UnitForm 
                curUser={curUser} 
                building_id={id}
                setRefreshUnits={setRefreshUnits}
                setDisplayUnitForm={setDisplayUnitForm} /> : 
                ''}

            { units.map(unit => {
                return (


                    <Unit 
                        curUser={curUser}
                        unit_id={unit._id}
                        unit_number={unit.unit_number}
                        setRefreshUnits={setRefreshUnits}
                        building_id={id} 
                    />
                       
                )
            })


            }



            
            
            
            
        </div>
    )
}
