import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, TextField, Typography, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserService from "../services/UserService";

export default function Auth (props){
  const navigate = useNavigate();
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const [alertMessage, setAlertMessage] = useState("")

  const handleChange = (e) => {
    setLoginInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    let user = {
      email: loginInputs.email,
      password: loginInputs.password,
    };
    e.preventDefault();
    UserService.getIdByLoginInputs(user).then((res) => {
      if(res.data){
        localStorage.setItem("loggedid", res.data);
        console.log(localStorage.getItem("loggedid"));
      }
    })
    UserService.loginUser(user).then((res) => {
      if(res.data){
        localStorage.setItem("authToken", res.data[1])
        navigate("/products")
      }else{
        setAlertMessage("Hibás email vagy jelszó.\nPróbáld Újra!")
      }
    })
    
  };



  return (
    <div
      style={{
        backgroundImage: 'url("/storage_backg_blue.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          opacity: 0.7,
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
            <Typography
              variant="h2"
              padding={3}
              textAlign={"center"}
              color={"grey"}
            >
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
            <div>
              {alertMessage}
            </div>
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
    </div>
  );
};
