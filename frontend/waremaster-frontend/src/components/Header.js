import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { AbcOutlined } from "@mui/icons-material";
import UserService from "../services/UserService";
export default function Header(props) {
  const navigate = useNavigate();

  const handleNavbarClick = (page) => {
    switch (page) {
      case "Requests":
        navigate("/requests");
        break;
      case "Storages":
        navigate("/storages");
        break;
      case "Products":
        navigate("/products");
        break;
      case "Orders":
        navigate("/orders");
        break;
      case "Request":
        navigate("/request");
        break;
      case "Logout":
        localStorage.removeItem("authToken");
        navigate("/");
        break;
    }
  };

  const [value, setValue] = useState();

  return (
    <React.Fragment>
      <AppBar color="warning" sx={{ padding: "auto" }}>
        <Toolbar>
          <Box display="flex" alignItems="center" sx={{ marginRight: 1 }}>
            <WidgetsIcon />
            <Typography sx={{ marginLeft: 1 }}>WareMaster</Typography>
          </Box>

          <Tabs
            textColor="inherit"
            sx={{ marginLeft: 1 }}
            value={value}
            onChange={(e, value) => setValue(value)}
            indicatorColor="white"
          >
            <Tab
              label="Requests"
              onClick={() => handleNavbarClick("Requests")}
            ></Tab>
            <Tab
              label="Storages"
              onClick={() => handleNavbarClick("Storages")}
            ></Tab>
            <Tab
              label="Products"
              onClick={() => handleNavbarClick("Products")}
            ></Tab>
            <Tab
              label="Orders"
              onClick={() => handleNavbarClick("Orders")}
            ></Tab>
            <Tab
              label="Request a Product movement"
              onClick={() => handleNavbarClick("Request")}
            ></Tab>

          </Tabs>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
            onClick={() => handleNavbarClick("Logout")}
          >
            LOG OUT
            <LogoutIcon sx={{ marginLeft: 1 }} />
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
