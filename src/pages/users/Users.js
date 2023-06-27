import React, { useState, useEffect } from 'react'
import { fetchUsers } from '../../actions/Actions';

import { mockDataTeam } from "./mockData";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BlockIcon from '@mui/icons-material/Block';
import Header from "./Header";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

import UsersActions from './UserActions';

export default function Users() {

  const [users, setUsers] = useState('none');
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [rowId, setRowId] = useState(null);
 

  //get users
  useEffect(() => { 
    fetchUsers(setUsers);
    setRefreshUsers(r => false);
  }, [refreshUsers])



  const theme = useTheme();
  
  const colors = tokens(theme.palette.mode);

  const columns = [

    { field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
      cellClassName: "name-column--cell",
    },
    { field: "email",
      editable: true,
      headerName: "Email",
      flex: 1,
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
        <UsersActions {...{ params, rowId, setRowId }} />
      ),
    },
  ];

  return (
    
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
        {users == 'none' ? 
          <HourglassTopIcon/>: 
          <DataGrid 
            rows={ users } 
            columns={columns} 
            getRowId={(row) => row._id}
            onCellEditStart={(params) => setRowId(params.id)}/>} 
      </Box>
    </Box>
  );
}




