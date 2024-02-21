import { Label } from "@mui/icons-material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import StoragesService from "../services/StoragesService.js"
import { useEffect } from "react";

const RequestProductMovement = () => {
  const [requestFrom, setRequestFrom] = React.useState("");
  const [requestTo, setRequestTo] = React.useState("");
  const [storages, setStorages] = React.useState([]);

  const handleFromChange = (event) => {
    setRequestFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setRequestTo(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await StoragesService.getAll();
        setStorages(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: 100, marginLeft: 30 }}>
      <div>
        <h2>Requesting a product movement</h2>
        <h4>
          This Page is for requesting product movements. Please pay attention
          for the capacity of the storages.
        </h4>
        <div style={{ display: "flex" }}>
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 20 }}
          >
            <h4 style={{ marginRight: 10, width: 250 }}>
              Storage to move product from :
            </h4>
            <FormControl sx={{ width: 400 }}>
              <InputLabel>From</InputLabel>
              <Select
                value={requestFrom}
                label="From"
                onChange={handleFromChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h4 style={{ marginRight: 10, width: 250 }}>
              Storage to move product to :
            </h4>
            <FormControl sx={{ width: 400 }}>
              <InputLabel>To</InputLabel>
              <Select value={requestTo} label="To" onChange={handleToChange}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestProductMovement;
