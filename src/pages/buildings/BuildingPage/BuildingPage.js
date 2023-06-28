import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import UnitForm from './UnitForm'
import { Button, Card, Typography, Box, useTheme } from '@mui/material';
import { fetchUnits, fetchBuilding } from '../../../actions/Actions'
import Unit from './Unit'
import UnitActions from './UnitActions';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BlockIcon from '@mui/icons-material/Block';
import { tokens } from "../../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import moment from 'moment';
import ArticleIcon from '@mui/icons-material/Article';
import LeasePopUpPage from './LeasePopUpPage';

export default function BuildingPage( {curUser} ) {

    let { id } = useParams();
    const buildingId = id;
    moment().format();

    const [displayUnitForm, setDisplayUnitForm] = useState(false);
    const [displayLeasePopUpPage, setDisplayLeasePopUpPage] = useState(false);
    const [refreshUnits, setRefreshUnits] = useState(false);
    const [units, setUnits] = useState('none');
    const [building, setBuilding] = useState('none');
    const [rowId, setRowId] = useState(null);
    const [curUnitId, setCurUnitId] = useState(null);
    

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //fetch units
    useEffect(() => {
        fetchUnits(id, setUnits);
        fetchBuilding(id, setBuilding);
        setRefreshUnits(r => false);
    }, [refreshUnits])


    
    

    const columns = [
      { field: "unit_number",
        headerName: "Unit Number",
        flex: 1,
        editable: true,
        type: 'number',
      },
      { field: "tenant_name",
        headerName: "Tenant Name",
        flex: 1,
        editable: true,
      },
      { field: "type",
        headerName: "Type",
        flex: 1,
        editable: true,
      },
      { field: "size",
        headerName: "Size",
        type: "number",
        flex: 1,
        editable: true,
      },
      { field: "price_per_sqft",
        headerName: "Price/Sqft",
        type: "number",
        flex: 1,
        editable: true,
      },
      { field: "vacant",
        headerName: "Vacant",
        flex: 1,
        type: 'boolean',
        editable: true,
      },
      { field: "base_rate",
        headerName: "Base Rate",
        flex: 1,
        type: 'number',
        editable: true,
      },
      { field: "end_of_insurance",
        headerName: "End of Insurance",
        type: 'date',
        width: 160,
        editable: true,
        valueFormatter: params => 
        moment(params?.value).format("DD/MM/YYYY"),
      },
      { field: "end_of_lease",
        headerName: "End of Lease",
        type: 'date',
        width: 160,
        editable: true,
        valueFormatter: params => 
        moment(params?.value).format("DD/MM/YYYY"),
      },
      { field: 'view_leases',
        headerName: 'View Leases',
        type: 'actions',
        renderCell: (params) => (
          <ArticleIcon 
          sx={{'&:hover': { color: "#6870fa" }}}
          onClick={() => {
            setCurUnitId(params.id);
            setDisplayLeasePopUpPage(true);

          }}/>
            
        ),
      },
      { field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <UnitActions  {...{ params, rowId, setRowId, buildingId, setRefreshUnits }}/>   
        ),
      }
    ];  
    


    return (
      <div>
        <Box m="20px">
          
          <Header title={building.name} />
          
          {displayLeasePopUpPage ? 
          <LeasePopUpPage 
          onClose={() => setDisplayLeasePopUpPage(false)}
          building_id={id}
          unit_id={curUnitId}
          curUser={curUser}
          />: null}
          
          <Button 
            sx={{backgroundColor:colors.primary[300], mX:2}} 
            onClick={() => setDisplayUnitForm(r => !r)}>
            <Typography>Add Unit</Typography>
          </Button>

          {displayUnitForm ? <UnitForm 
            curUser={curUser} 
            building_id={id}
            setRefreshUnits={setRefreshUnits}
            setDisplayUnitForm={setDisplayUnitForm} /> : 
            ''}
          <Box
            m="40px 0 0 0"
            height="71vh"
            
            sx={{
            "& .MuiDataGrid-root": {
                border: "none",
            },
            
            "& .MuiDataGrid-cell": {
                borderBottom: "none",
            },
            "& .name-column--cell": {
                color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
            },
            }}
          >
            {units == 'none' ? 
            <HourglassTopIcon/>: 
            <DataGrid 
                rows={ units } 
                columns={columns} 
                getRowId={(row) => row._id}
                onCellEditStart={(params) => setRowId(params.id)
                }
            />} 
          </Box>
        </Box>

      </div>


    
            
    )
}
