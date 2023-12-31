import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ApartmentIcon from '@mui/icons-material/Apartment';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import MailIcon from '@mui/icons-material/Mail';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SideBar = ( {curUser} ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");


  

  return (
    <Box
      sx={{
        
        height: '100%',
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">

          {/* LOGO AND MENU ICON */}
          <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              }}
          >
              {!isCollapsed && (
              <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
              >
                  <Typography variant="h3" color={colors.grey[100]}>
                  PGK
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                  </IconButton>
              </Box>
              )}
          </MenuItem>


          {/* Profile info */}   
          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                  <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                  >
                    
                  {curUser == 'none' ? <HourglassTopIcon />: curUser.name}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                  {curUser == 'none' ? <HourglassTopIcon />: curUser.role}
                  </Typography>
              </Box>
            </Box>
          )}


              
          {/* Menu */}  
              
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>

            <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
            >
                Menu
            </Typography>

            {curUser.role === "client" ?
            <div>
              <Item 
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
            </div> : 
            <div>
              <Item 
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
              <Item
              title="Buildings"
              to="/buildings"
              icon={<ApartmentIcon/>}
              selected={selected}
              setSelected={setSelected}
              />
              <Item
              title="Emails"
              to="/mail"
              icon={<MailIcon />}
              selected={selected}
              setSelected={setSelected}
              />
              <Item
              title="Users"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
            </div>
            }
              
          </Box>

        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBar;