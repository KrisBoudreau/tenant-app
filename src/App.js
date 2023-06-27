import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./components/login/LoginPage";
import ResponsiveAppBar from "./components/navbar/AppBar";
import Home from "./pages/home/Home";
import Buildings from "./pages/buildings/buildings/Buildings";
import Users from "./pages/users/Users";
import { fetchUser } from "./actions/Actions";
import BuildingPage from "./pages/buildings/BuildingPage/BuildingPage";
import './App.css';
import LeasePage from './pages/buildings/BuildingPage/LeasePage/LeasePage'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import TopBar from "./components/navbar/TopBar";
import SideBar from "./components/navbar/SideBar";
import Users2 from "./pages/users/Users2";


function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const { isAuthenticated, isLoading, user } = useAuth0();
  const [curUser, setCurUser] = useState('none');


  //get current User info
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return <LoginPage />;
    fetchUser(user.email, setCurUser);
  }, [isLoading])



  if (isLoading) return <div>Loading ...</div>
  if (!isAuthenticated) return <LoginPage />
  
  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> 
        <CssBaseline /> 

        
        <div className="app">
            <SideBar curUser={curUser}/> 
            {/* <ResponsiveAppBar /> */}
            <main className="content">
              <TopBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buildings" element={<Buildings curUser={curUser} />} />
                <Route path="/buildings/:id" element={<BuildingPage curUser={curUser} />} />
                <Route path="/leases/:id" element={<LeasePage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users2" element={<Users2 />} />
              </Routes>
            </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
