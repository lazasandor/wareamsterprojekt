import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, TextField, Typography, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserService from "../services/UserService";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Register } from "../components/Register";



const RegisterPage = () => {
  return (
    <div>
        <Box>
            <Register />
        </Box>
    </div>
  )
}

export default RegisterPage