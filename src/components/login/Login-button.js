import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";



const LoginButton = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { loginWithRedirect } = useAuth0();

  return (
    
      <Button size="large" sx={{display: 'flex'}} onClick={() => loginWithRedirect()}>
        Log In
      </Button>


)};

export default LoginButton;