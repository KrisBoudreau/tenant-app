import React from 'react'

import { useAuth0 } from "@auth0/auth0-react";
import { Button} from "@mui/material";
//import { tokens } from "../../theme";


export default function LoginPage() {

  //const theme = useTheme();
  //const colors = tokens(theme.palette.mode);

  const { loginWithRedirect } = useAuth0();

  return (
    <div style={{
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'fixed',
      backgroundColor: "#1F2A40",
      

    }}>

    
      <Button size="large" sx={{display: 'flex'}} onClick={() => loginWithRedirect()}>
        Log In
      </Button>





    </div>
  )
}

