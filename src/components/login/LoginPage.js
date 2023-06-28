import React from 'react'
import LoginButton from './Login-button'
import { useContext } from "react";
import { Box, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";

export default function LoginPage() {

  return (
    <div style={{
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'fixed',
      backgroundColor: "#1F2A40",
      

    }}>

      <LoginButton />


    </div>
  )
}

