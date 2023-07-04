import React from 'react'
import { Button, Typography, Box, useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import { fetchLeases } from '../../../actions/Actions';
import { useEffect, useState } from 'react';
import LeaseForm from './LeaseForm';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import moment from 'moment';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid } from "@mui/x-data-grid";
import LeaseActions from './LeaseActions';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'
import LeasePage from './LeasePage'


export default function LeasePopUpPage( {onClose, building_id, unit_id, curUser, setDisplayLease, setCurLease} ) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  moment().format();
  const [rowId, setRowId] = useState(null);

  const [displayLeaseForm, setDisplayLeaseForm] = useState(false);
  const [refreshLeases, setRefreshLeases] = useState(false);
  const [leases, setLeases] = useState('none');
  

  const columns = [
    { field: "resident",
      headerName: "Resident",
      type: "boolean",
      flex: 1,
      editable: true,
    },
    { field: "tenant_name",
      headerName: "Tenant",
      flex: 1,
      editable: true,
    },
    { field: "tenant_phone",
      headerName: "Phone",
      type: 'number',
      flex: 1,
      editable: true,
    },
    { field: "tenant_email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    { field: "start_date",
      headerName: "Start",
      type: 'date',
      width: 150,
      editable: true,
      valueFormatter: params => 
      moment(params?.value).format("DD/MM/YYYY"),
    },
    { field: "end_date",
      headerName: "End",
      type: 'date',
      width: 150,
      editable: true,
      valueFormatter: params => 
      moment(params?.value).format("DD/MM/YYYY"),
    },
    { field: 'view_lease',
      headerName: 'View Lease',
      type: 'actions',
      renderCell: (params) => (
        <InfoIcon 
        sx={{'&:hover': { color: "#6870fa" }}}
        onClick={() => { 
          axios.get(`http://localhost:3001/buildings/${building_id}/units/${unit_id}/leases/${params.id}`)
          .then(l => setCurLease(l.data[0]))
          .then(setDisplayLease(true))  
        }}/>  
      ),
    },
    { field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <LeaseActions { ...{ 
            params, rowId, 
            setRowId, building_id, 
            unit_id, setRefreshLeases }} />   
        ),
      }
  ]; 


  //get leases
  useEffect(() => { 
      fetchLeases(building_id, unit_id, setLeases);
      setRefreshLeases(r => false);
  
  }, [refreshLeases, displayLeaseForm, building_id, unit_id])
    

  return (

    <div>
      
      {leases === 'none' ? 
      <HourglassTopIcon/>: 

      //DATA GRID
      <Box
      sx={{
        m: 2,
        backgroundColor: colors.primary[400],
        border: 2,
        "& .MuiDataGrid-root": {border: "none"},
        "& .MuiDataGrid-cell": {borderBottom: "none"},
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {backgroundColor: colors.primary[400]},
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {color: `${colors.greenAccent[200]} !important`}
      }}>


        <Box justifyContent='space-between' display='flex' m={1} >
          <Typography variant="h2" color={colors.grey[100]} fontWeight="bold"> 
          Leases </Typography>

          <IconButton onClick={() =>  onClose()}>
            <CloseIcon sx={{color: 'red'}}/>
          </IconButton>
        </Box>

        <Button 
          sx={{backgroundColor: 'GrayText',  justifyContent: 'flex',
          alignContent: 'center', m: 1}}
          onClick={() => setDisplayLeaseForm(r => !r)}>
            <AddIcon />
          Create lease
        </Button>
          {displayLeaseForm? <LeaseForm {...{building_id, unit_id, curUser, setRefreshLeases, setDisplayLeaseForm}}/>: ''}

        
        <DataGrid 
          rows={ leases } 
          columns={columns} 
          getRowId={(row) => row._id}
          onCellEditStart={(params) => setRowId(params.id)}
          pageSizeOptions={[]}
        />

      </Box>}
    </div>
 
  )
}
