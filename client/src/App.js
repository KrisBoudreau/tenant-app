import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import TopBar from "./components/navbar/TopBar";
import SideBar from "./components/navbar/SideBar";
import LoginPage from "./components/login/LoginPage";
import Home from "./pages/admin/home/Home";
import Buildings from "./pages/admin/buildings/Buildings";
import Users from "./pages/admin/users/Users";
import BuildingPage from "./pages/admin/BuildingPage/BuildingPage";
import ContactForm from "./pages/admin/contact/ContactForm";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Profile from './components/Profile'
import Client from './pages/client/Client'
import { fetchUser } from "./actions/Actions";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

//here
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

  if (isLoading) return <HourglassTopIcon />

  if (!isAuthenticated) return <LoginPage />;


  
  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> 
        <CssBaseline />

        {curUser.role === "blocked" ? 
          <div>ur blocked</div> : 
        curUser.role === "client" ?

          <div className="app">
          <SideBar curUser={curUser}/> 
          <main className="content">
            <TopBar />
            <Client { ...{curUser} }/>
            
          </main>
          </div> :  

        <div className="app">
            <SideBar curUser={curUser}/> 
            <main className="content">
              <TopBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buildings" element={<Buildings curUser={curUser} />} />
                <Route path="/buildings/:id" element={<BuildingPage curUser={curUser} />} />
                <Route path="/users" element={<Users />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/mail/:id" element={<ContactForm />} />
              </Routes>
            </main>
        </div>
        }
       
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
