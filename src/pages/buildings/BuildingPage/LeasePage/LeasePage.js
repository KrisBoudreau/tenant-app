import React from 'react'
import { Button } from '@mui/material';
import { removeLease, fetchLease } from '../../../../actions/Actions';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function LeasePage() {

    const { id } = useParams();

    const [lease, SetLease] = useState('none');
    const [refreshLease, setRefreshLease] = useState(false);
    
    //get lease
    useEffect(() => {
        fetchLease(id, SetLease);
        setRefreshLease(r => false);
    })
    if (lease == 'none') return <div>loading...</div>

  return (
    <div>
        
        
        LeasePage <br/>

        {lease.tenant_name} <br/>
        {lease.tenant_email} 


        <Button onClick = {() => {
                removeLease(lease.unit_id, lease.building_id, lease._id);
            }}
            sx={{color: 'red', backgroundColor: 'navajowhite', margin: 2}}> 
            Delete Lease
        </Button>

    </div>
  )
}
