import React from 'react'
import { Card, Button } from '@mui/material'
import { removeLease } from '../../../actions/Actions'
import { Link } from 'react-router-dom';

export default function LeaseCard( {lease, setRefreshLeases} ) {
  return (
    <Card sx={{margin:1, border:1}}>
        LeaseCard <br/>
        {lease.tenant_name} <br />
       
        {lease.tenant_email} <br/>
        {lease.storage} <br/>

        
        
        <Link to={`/leases/${lease._id}`} style={{ textDecoration: 'none' }}>
            <Button>
                Expand Lease Page
            </Button>
        </Link>


        <Button onClick = {() => {
                removeLease(lease.unit_id, lease.building_id, lease._id);
                setRefreshLeases(r => true);
            }}
            sx={{color: 'red', backgroundColor: 'navajowhite', margin: 2}}> 
            Delete Lease
        </Button>


    </Card>
  )
}
