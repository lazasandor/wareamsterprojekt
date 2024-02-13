import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ProductsService from "../services/ProductsService";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from '@mui/joy/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionsColumn = () => {
  const handleEdit = () => {
    // Edit functionality
    console.log("Edit button clicked for id:");
  };

  const handleDelete = () => {
    // Delete functionality
    console.log("Delete button clicked for id:");
  };

  return (
    <div>
      <IconButton onClick={handleEdit} aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

const PageSizeCustomOptions = (props) => {
  const [rows, setRows] = React.useState([]);

  const [total, setTotal] = React.useState(0);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      valueGetter: (params) => params.row.category.category,
    },
    {field: "actions", headerName: "Actions", width:150, renderCell: (params) => <ActionsColumn id={params.row.id} />,}
  ];

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const [rowCountState, setRowCountState] = React.useState(total || 0);

  const fetchProducts = (page, size) => {
    ProductsService.getAllProducts(page, size)
      .then((res) => {
        setTotal(res.data.totalElements);
        setRows(res.data.content);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      total !== undefined ? total : prevRowCountState
    );
  }, [total, setRowCountState]);

  useEffect(() => {
    fetchProducts(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  const categories = [
    "Faanyagok",
    "Építőanyagok",
    "Szigetelőanyagok",
    "Szárazépítészeti anyagok",
    "Csavarok és rögzítőelemek",
  ];

  const renderInput = (params) => (
    <TextField
      {...params}
      label="Category"
      variant="outlined"
      InputProps={{
        ...params.InputProps,
      }}
    />
  );

  const handleSearchButtonClicked = () => {
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const category = document.getElementById("category").value;

    ProductsService.searchByParameters(0, paginationModel.pageSize, name, id, category)
      .then((res) => {
        setTotal(res.data.totalElements);
        setRows(res.data.content);
      })
      .catch((error) => {
        console.error("Error searching products:", error);
      });
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        marginBottom: 30,
      }}
    >
      <div style={{ width: "80%" }}>
        <Grid container spacing={2} alignItems="center" sx={{marginBottom:4}}>
          <Grid item xs>
            <TextField placeholder="Name" fullWidth id="name"/>
          </Grid>
          <Grid item xs>
            <TextField placeholder="Id" fullWidth id="id"/>
          </Grid>
          <Grid item xs>
            <Autocomplete
              options={categories}
              renderInput={renderInput}
              fullWidth
              id="category"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="warning" onClick={handleSearchButtonClicked}>
              Search
            </Button>
          </Grid>
        </Grid>

        <DataGrid
          style={{
            border: "2px solid orange",
            borderRadius: "5px",
            textAlign: "center",
          }}
          rows={rows}
          columns={columns}
          rowCount={rowCountState}
          pageSizeOptions={[5, 10, 25]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
        />
      </div>
    </div>
  );
};

export default PageSizeCustomOptions;
