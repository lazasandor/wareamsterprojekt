import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, TextField, Typography, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";

const Auth = () => {
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginInputs);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        opacity:0.7
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          bgcolor={"white"}
        >
          <Typography variant="h2" padding={3} textAlign={"center"} color={"grey"}>
            <b>WareMaster Login</b>
          </Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Email"
            name="email"
            value={loginInputs.email}
            onChange={handleChange}
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Password"
            name="password"
            value={loginInputs.password}
            onChange={handleChange}
          />
          <Button
            endIcon={<LoginIcon />}
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
          >
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
