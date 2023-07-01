import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./components/login/LoginPage";

import Home from "./pages/home/Home";
import Buildings from "./pages/buildings/Buildings";
import Users from "./pages/users/Users";
import { fetchUser } from "./actions/Actions";
import BuildingPage from "./pages/BuildingPage/BuildingPage";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import TopBar from "./components/navbar/TopBar";
import SideBar from "./components/navbar/SideBar";
import Users2 from "./pages/users/Users2";
import ContactForm from "./pages/contact/ContactForm";
import { Box } from '@mui/material'


function App() {

  const [theme, colorMode] = useMode();
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [curUser, setCurUser] = useState('none');


  //get current User info
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return <LoginPage />;
    if (user) fetchUser(user.email, setCurUser);
  }, [isLoading, isAuthenticated])

  if (!isAuthenticated) return <LoginPage />;
  

  
  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> 
        <CssBaseline /> 

        <div className="app">
            <SideBar curUser={curUser}/> 
            <main className="content">
              <TopBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buildings" element={<Buildings curUser={curUser} />} />
                <Route path="/buildings/:id" element={<BuildingPage curUser={curUser} />} />
                {/* <Route path="/leases/:id" element={<LeasePage />} /> */}
                <Route path="/users" element={<Users />} />
                <Route path="/users2" element={<Users2 />} />
                <Route path="/email" element={<ContactForm />} />
              </Routes>
            </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
