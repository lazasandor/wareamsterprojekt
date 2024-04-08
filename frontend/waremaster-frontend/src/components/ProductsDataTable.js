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
import { TextareaAutosize } from "@mui/material";
import { Textarea } from "@mui/joy";

const categories = [
  "Faanyagok",
  "Építőanyagok",
  "Szigetelőanyagok",
  "Szárazépítészeti anyagok",
  "Csavarok és rögzítőelemek",
];

const ActionsColumn = ({ id, handleSearchButtonClicked, page, size }) => {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editedData, setEditedData] = React.useState({
    id: null,
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: {},
  });

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = () => {
    ProductsService.delete(id)
      .then(() => {
        handleSearchButtonClicked(page, size, false);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleEditOpen = () => {
    ProductsService.getById(id).then((result) => {
      setEditedData({
        id: result.data.id,
        name: result.data.name,
        description: result.data.description,
        price: result.data.price,
        quantity: result.data.quantity,
        category: result.data.category.category,
      });
    });

    setEditOpen(true);
  };

  const handleSave = async () => {
    try {
      const categoryResult = await ProductsService.getCategoryByName(
        editedData.category
      );
      const updatedEditedData = {
        ...editedData,
        category: categoryResult.data,
      };
      setEditedData(updatedEditedData);

      await ProductsService.update(updatedEditedData);

      handleSearchButtonClicked(page, size, false);

      setEditOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const renderInput = (params) => (
    <TextField
      {...params}
      label="Category"
      variant="outlined"
      InputProps={{
        ...params.InputProps,
      }}
      sx={{ margin: 2, width: 300 }}
    />
  );

  return (
    <div>
      <IconButton onClick={handleEditOpen} aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDeleteOpen} aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Record?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="warning" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedData.name}
            onChange={(e) =>
              setEditedData({ ...editedData, name: e.target.value })
            }
            sx={{ margin: 2 }}
          />

          <TextField
            label="Quantity"
            value={editedData.quantity}
            onChange={(e) =>
              setEditedData({ ...editedData, quantity: e.target.value })
            }
            sx={{ margin: 2 }}
          />
          <TextField
            label="Price"
            value={editedData.price}
            onChange={(e) =>
              setEditedData({ ...editedData, price: e.target.value })
            }
            sx={{ margin: 2 }}
          />
          <Autocomplete
            options={categories}
            renderInput={renderInput}
            fullWidth
            id="category"
            value={editedData.category}
            onChange={(e, newValue) =>
              setEditedData({ ...editedData, category: newValue })
            }
          />
          <Textarea
            label="Description"
            value={editedData.description}
            onChange={(e) =>
              setEditedData({ ...editedData, description: e.target.value })
            }
            rowsMin={3}
            sx={{ margin: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="warning">
            Save
          </Button>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const PageSizeCustomOptions = (props) => {
  const [addOpen, setAddOpen] = React.useState(false);

  const [rows, setRows] = React.useState([]);

  const [total, setTotal] = React.useState(0);

  const [addData, setAddData] = React.useState({
    id: null,
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: {},
  });

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
    { field: "quantity", headerName: "Quantity", width: 120},
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

  const renderInput = (params) => (
    <TextField
      {...params}
      label="Category"
      variant="outlined"
      InputProps={{
        ...params.InputProps,
      }}
      sx={{ margin: 2, width: 300 }}
    />
  );

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      total !== undefined ? total : prevRowCountState
    );
  }, [total, setRowCountState]);

  useEffect(() => {
    handleSearchButtonClicked(
      paginationModel.page,
      paginationModel.pageSize,
      false
    );
  }, [paginationModel.page, paginationModel.pageSize]);

  const handleSearchButtonClicked = (page, size, setToFirst) => {
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const category = document.getElementById("category").value;
    if (setToFirst) {
      setPaginationModel({ pageSize: size, page: 0 });
    }
    ProductsService.searchByParameters(page, size, name, id, category)
      .then((res) => {
        setTotal(res.data.totalElements);
        setRows(res.data.content);
      })
      .catch((error) => {
        console.error("Error searching products:", error);
      });
  };

  const handleAddButtonClicked = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleAddSave = async () => {
    const categoryResult = await ProductsService.getCategoryByName(
      addData.category
    );
 
    const updatedAddData = {
      ...addData,
      category: categoryResult.data,
    };

    
    await ProductsService.save(updatedAddData);

    handleSearchButtonClicked(
      paginationModel.page,
      paginationModel.pageSize,
      false
    );

    setAddOpen(false);
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
              color="inherit"
              onClick={() =>
                handleSearchButtonClicked(
                  paginationModel.page,
                  paginationModel.pageSize,
                  true
                )
              }
            >
              Search
            </Button>
            <Button
              sx={{ marginLeft: 2 }}
              variant="contained"
              color="warning"
              onClick={() => handleAddButtonClicked()}
            >
              ADD
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
        <Dialog open={addOpen}>
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              sx={{ margin: 2 }}
              onChange={(e) => setAddData({ ...addData, name: e.target.value })}
            />

            <TextField
              label="Quantity"
              sx={{ margin: 2 }}
              onChange={(e) =>
                setAddData({ ...addData, quantity: e.target.value })
              }
            />
            <TextField
              label="Price"
              sx={{ margin: 2 }}
              onChange={(e) =>
                setAddData({ ...addData, price: e.target.value })
              }
            />
            <Autocomplete
              options={categories}
              renderInput={renderInput}
              fullWidth
              onChange={(e, newValue) =>
                setAddData({ ...addData, category: newValue })
              }
            />
            <Textarea
              placeholder="Description"
              onChange={(e) =>
                setAddData({ ...addData, description: e.target.value })
              }
              rowsMin={3}
              sx={{ margin: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button color="warning" onClick={handleAddSave}>
              Save
            </Button>
            <Button color="primary" onClick={handleAddClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default PageSizeCustomOptions;
