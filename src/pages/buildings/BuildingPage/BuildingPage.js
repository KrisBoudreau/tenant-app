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

export default function BuildingPage( {curUser} ) {

    let { id } = useParams();

    const [displayUnitForm, setDisplayUnitForm] = useState(false);
    const [refreshUnits, setRefreshUnits] = useState(false);
    const [units, setUnits] = useState('none');
    const [building, setBuilding] = useState('none');
    const [rowId, setRowId] = useState(null);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    useEffect(() => {
        fetchUnits(id, setUnits);
        fetchBuilding(id, setBuilding);
        setRefreshUnits(r => false);

    }, [refreshUnits])


    if (units == 'none' ) return <div>Loading...</div>
    if (building == 'none' ) return <div>Loading...</div>

    const columns = [
        { field: "unit_number",
          headerName: "Unit Number",
          flex: 1,
          editable: true,
          cellClassName: "name-column--cell",
        },
        { field: "role",
          headerName: "Role",
          flex: 1,
          editable: true,
          type: 'singleSelect',
          valueOptions: ['admin', 'full access', 'view only', 'blocked'],
          renderCell: ({ row: { role } }) => {
            return (
              <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                  role === "admin"
                    ? colors.greenAccent[600]
                    : role === "manager"
                    ? colors.greenAccent[700]
                    : colors.greenAccent[700]
                }
                borderRadius="4px"
              >
                {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
                {role === "full access" && <SecurityOutlinedIcon />}
                {role === "view only" && <LockOpenOutlinedIcon />}
                {role === "blocked" && <BlockIcon />}
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  {role}
                </Typography>
              </Box>
            );
          },
          
        },
        { field: 'actions',
          headerName: 'Actions',
          type: 'actions',
          renderCell: (params) => (
            // {...{ params, rowId, setRowId }}
            <UnitActions  {...{ params, rowId, setRowId }}/>
          ),
        },
      ];
    

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

            <Box m="20px">
                <Header title="Users" subtitle="Managing the Team Members" />
                <Box
                    m="40px 0 0 0"
                    height="75vh"
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
                    {/* mockDataTeam */}
                    {units == 'none' ? 
                    <HourglassTopIcon/>: 
                    <DataGrid 
                        rows={ units } 
                        columns={columns} 
                        getRowId={(row) => row._id}
                        onCellEditStart={(params) => setRowId(params.id)}
                    />} 
                </Box>
            </Box>
    
        </div>
    )
}
