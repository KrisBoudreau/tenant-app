import React from 'react'
import { Button, Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material'
import { removeUnit } from '../../../actions/Actions'
import { useState, useEffect } from 'react'
import LeaseForm from './LeaseForm'
import { SignalWifi3BarLockSharp } from '@mui/icons-material'
import { fetchLeases } from '../../../actions/Actions'
import LeaseCard from './LeaseCard'


export default function Unit( {curUser, unit_id, unit_number, setRefreshUnits, building_id} ) {

    const [displayLeaseForm, setDisplayLeaseForm] = useState(false);
    const [refreshLeases, setRefreshLeases] = useState(false);
    const [leases, setLeases] = useState('none');


     //get leases
    useEffect(() => { 
        fetchLeases(building_id, unit_id, setLeases);
        setRefreshLeases(r => false);
    
    }, [refreshLeases])
    if (leases === 'none'){
        return <h1>loading</h1>
    }

    

    return (
        <div>
            
            <Accordion sx={{
                backgroundColor: 'lightblue',
                border: 1,
                m: 1
            }}
            >

                <AccordionSummary
                expandIcon={<SignalWifi3BarLockSharp />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography variant='h4'>{unit_number}</Typography>
                </AccordionSummary>


                <AccordionDetails>
                    <Typography variant="h4">
                        Leases
                    </Typography>

                    <Button onClick={() => setDisplayLeaseForm(r => !r)}>Add lease</Button>
                
                    {displayLeaseForm ? <LeaseForm 
                    building_id={building_id} 
                    unit_id={unit_id}
                    curUser={curUser} 
                    setRefreshLeases={setRefreshLeases} 
                    setDisplayLeaseForm={setDisplayLeaseForm} /> : ''}


                    { leases.map(lease => {
                        return (
                            <LeaseCard lease={lease} setRefreshLeases={setRefreshLeases}/>
                        )
                    })}

                </AccordionDetails>

                <Button onClick = {() => {
                        removeUnit(unit_id, building_id);
                        setRefreshUnits(r => true);
                    }}
                    sx={{color: 'red', backgroundColor: 'navajowhite', margin: 2}}> 
                    Delete Unit 
                </Button>


            </Accordion>










        </div>
    )
}
