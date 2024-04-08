import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import OrderService from "../services/OrderService";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton"; // Új importálás
import InfoIcon from "@mui/icons-material/Info"; // Új importálás

const OrdersDataTable = () => {
  const [rows, setRows] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [rowCountState, setRowCountState] = React.useState(total || 0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleDialogOpen = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 30,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "orderDate",
        headerName: "Date",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "quantity",
        headerName: "Quantity",
        width: 90,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "customerName",
        headerName: "Name",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "customerAddress",
        headerName: "Address",
        width: 150,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "customerPhone",
        headerName: "Phone",
        width: 220,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "storageOrderedFrom",
        headerName: "Storage",
        width: 140,
        valueGetter: (params) => params.row.storageOrderedFrom.city,
        headerAlign: "center",
        align: "center",
      },

    {
      //field: "items",
      headerName: "Products",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          {params.value}{" "}
          <IconButton
            onClick={() => handleDialogOpen(params.row)}
            size="small"
          >
            <InfoIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      total !== undefined ? total : prevRowCountState
    );
  }, [total, setRowCountState]);

  const handleLoadData = (page, size, setToFirst) => {
    if (setToFirst) {
      setPaginationModel({ pageSize: size, page: 0 });
    }
    OrderService.getAllOrders(page, size)
      .then((res) => {
        setTotal(res.data.totalElements);
        setRows(res.data.content);
      })
      .catch((error) => {
        console.error("Error loading requests:", error);
      });
  };

  useEffect(() => {
    handleLoadData(paginationModel.page, paginationModel.pageSize, false);
  }, [paginationModel.page, paginationModel.pageSize]);

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
        <h4>
          Here are the orders from the shop/webshop using this application as a
          management system.
        </h4>
        <p>Total sum of the orders: </p>
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
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Ordered Products</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedItem && selectedItem.items}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default OrdersDataTable;
