import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./components/login/LoginPage";
import ResponsiveAppBar from "./components/navbar/AppBar";
import Home from "./components/home/Home";
import Buildings from "./components/buildings/Buildings";
import Users from "./components/users/Users";
import { fetchUser } from "./actions/Actions";


function App() {

  const { isAuthenticated, isLoading, user } = useAuth0();
  const [curUser, setCurUser] = useState();


  //get current User info
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return <LoginPage />;
    fetchUser(user.email, setCurUser);
  }, [isLoading])



  if (isLoading) return <div>Loading ...</div>
  if (!isAuthenticated) return <LoginPage />
  return (
    <>
    <ResponsiveAppBar />
    <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buildings" element={<Buildings />} />
          <Route path="/users" element={<Users />} />
        </Routes>
    </div>
    </>
  );
}

export default App;
