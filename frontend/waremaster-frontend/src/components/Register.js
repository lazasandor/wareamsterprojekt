import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  TextField,
  Typography,
  Button,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserService from "../services/UserService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DialogContent } from "@mui/joy";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

export const Register = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [registerInputs, setRegisterInputs] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    adminEmail: "",
    adminPassword: "",
  });
  const [regSucc, setRegSucc] = React.useState(false);

  const handleChange = (e) => {
    setRegisterInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitRegister = async (event) => {
    let admin = {
      email: registerInputs.adminEmail,
      password: registerInputs.adminPassword,
    };
    let user = {
      email: registerInputs.email,
      password: registerInputs.password,
      name: registerInputs.firstName + " " + registerInputs.lastName,
    };
    event.preventDefault();
    UserService.loginUser(admin).then((res) => {
      if (res.data) {
        setAlertMessage("");
        registerUser(user);
      } else {
        setAlertMessage("Administrator login error!");
      }
    });
  };
  var regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const registerUser = (user) => {
    if (
      user.password === "" ||
      user.email === "" ||
      user.firstName === "" ||
      user.lastName === ""
    ) {
      setAlertMessage("Please fill all fields!");
    }
    if (!regularExpression.test(user.password)) {
      setAlertMessage(
        "Password must be 6 to 16 character long\n\n\n with at least one number and one special character."
      );
    }
    setAlertMessage("");
    registerUserSuccess(user);
  };

  const registerUserSuccess = (user) => {
    UserService.registerUser(user).then((res) => {
      if (res.data) {
        setRegSucc(true);
      }
    });
  };

  const handleBackToLogin = () => {
    navigate("/");
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
        <form onSubmit={handleSubmitRegister}>
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth={600}
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
              <b>WareMaster Register</b>
            </Typography>
            <div>
              <TextField
                sx={{ marginRight: 4 }}
                margin="normal"
                variant="outlined"
                placeholder="First Name"
                name="firstName"
                value={registerInputs.firstName}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                variant="outlined"
                placeholder="Last Name"
                name="lastName"
                value={registerInputs.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                sx={{ marginRight: 4 }}
                margin="normal"
                type={"email"}
                variant="outlined"
                placeholder="Email"
                name="email"
                value={registerInputs.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                type={"password"}
                variant="outlined"
                placeholder="Password"
                name="password"
                value={registerInputs.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                sx={{ marginRight: 4 }}
                margin="normal"
                type={"email"}
                variant="outlined"
                placeholder="Administrator Email"
                name="adminEmail"
                value={registerInputs.adminEmail}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                type={"password"}
                variant="outlined"
                placeholder="Administrator Password"
                name="adminPassword"
                value={registerInputs.adminPassword}
                onChange={handleChange}
              />
            </div>

            <div style={{ textAlign: "center" }}>{alertMessage}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                endIcon={<AccountCircleIcon />}
                type="submit"
                sx={{ marginTop: 2, borderRadius: 3, width: 120 }}
                variant="contained"
                color="warning"
                onClick={handleSubmitRegister}
              >
                Register
              </Button>
            </div>

            <div style={{ marginTop: 15 }}>
              If you already have an account click{" "}
              <a href="http://localhost:3000/">here</a>.
            </div>
          </Box>
        </form>
      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
      <Dialog open={regSucc}>
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          <DialogContentText style={{marginLeft:5, marginRight:5}}>
            Registered successfully, now you can log-in.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={() => handleBackToLogin()}>
            Back to login
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      
    </div>
  );
};
