import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ProductsService from "../services/ProductsService";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/joy/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ActionsColumn = ({ id, handleSearchButtonClicked,page,size }) => {
  const [open, setOpen] = React.useState(false);

  const handleDeleteOpen = () => {
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete button clicked for id:", id);
    ProductsService.delete(id)
      .then(() => {
        handleSearchButtonClicked(page, size, false);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleEditOpen = () => {
      console.log("edit opened for id " + id)
  };

  return (
    <div>
      <IconButton onClick={handleEditOpen} aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDeleteOpen} aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Record?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="warning">
            No
          </Button>
          <Button onClick={handleDelete} color="warning" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const PageSizeCustomOptions = (props) => {

  const [rows, setRows] = React.useState([]);

  const [total, setTotal] = React.useState(0);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const [rowCountState, setRowCountState] = React.useState(total || 0);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    {
      field: "category",
      headerName: "Category",
      width: 250,
      valueGetter: (params) => params.row.category.category,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <ActionsColumn
          id={params.row.id}
          handleSearchButtonClicked={handleSearchButtonClicked}
          page={paginationModel.page}
          size={paginationModel.pageSize}
        />
      ),
    },
  ];

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

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      total !== undefined ? total : prevRowCountState
    );
  }, [total, setRowCountState]);

  useEffect(() => {
    handleSearchButtonClicked(paginationModel.page, paginationModel.pageSize, false);
  }, [paginationModel.page, paginationModel.pageSize]);

  const handleSearchButtonClicked = (page, size, setToFirst) => {
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const category = document.getElementById("category").value;
    //setPaginationModel({pageSize:10, page:0})
    if(setToFirst){
      setPaginationModel({pageSize:size, page:0})
    }
    ProductsService.searchByParameters(
      page,
      size,
      name,
      id,
      category
    )
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
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ marginBottom: 4 }}
        >
          <Grid item xs>
            <TextField placeholder="Name" fullWidth id="name" />
          </Grid>
          <Grid item xs>
            <TextField placeholder="Id" fullWidth id="id" />
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
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleSearchButtonClicked(paginationModel.page, paginationModel.pageSize, true)}
            >
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
