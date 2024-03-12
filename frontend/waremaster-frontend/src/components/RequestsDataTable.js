import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import RequestMovementService from "../services/RequestMovementService.js";
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
import InfoIcon from "@mui/icons-material/Info";
import { TextareaAutosize } from "@mui/material";
import { Textarea } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { yellow } from "@mui/material/colors";

const ActionsColumn = ({
  id,
  handleLoadData,
  page,
  size,
  status,
  loadStatus,
}) => {
  const [doneOpen, setDoneOpen] = React.useState(false);
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [requestDetail, setRequestDetail] = React.useState("");
  const handleDoneOpen = () => {
    setDoneOpen(true);
  };
  const handleDoneClose = () => {
    setDoneOpen(false);
  };
  const handleCancelOpen = () => {
    setCancelOpen(true);
  };
  const handleCancelClose = () => {
    setCancelOpen(false);
  };
  const handleCancelRequest = (id) => {
    RequestMovementService.reuqestCancel(id).then((res) => {
      if (res.data) {
        //open cancel succes
      }
      setCancelOpen(false);
      //window.location.reload();
      handleLoadData(page, size, false);
      loadStatus();
    });
  };
  const handleDoneRequest = (id) => {
    RequestMovementService.reuqestDone(id).then((res) => {
      if (res.data) {
        //open done succes
      }
      setDoneOpen(false);
      //window.location.reload();
      handleLoadData(page, size, false);
      loadStatus();
    });
  };
  const fetchRow = async (id) => {
    const p = await fetch(
      "http://localhost:8080/api/productmovement/findbyid/" + id
    );
    const res = await p.json();
    setRequestDetail(res);
    handleDetailsOpen();
  };
  const handleDetailsOpen = async () => {
    setDetailsOpen(true);
  };
  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };
  return (
    <div>
      {status === "In Progress..." && (
        <IconButton onClick={handleDoneOpen}>
          <CheckIcon />
        </IconButton>
      )}
      {status === "In Progress..." && (
        <IconButton onClick={handleCancelOpen}>
          <CloseIcon />
        </IconButton>
      )}
      <IconButton onClick={() => fetchRow(id)}>
        <InfoIcon />
      </IconButton>

      <Dialog open={doneOpen}>
        <DialogTitle>Products delivered?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Proceed if the request is done and the quantity will be overwritten.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={() => handleDoneRequest(id)}>
            Proceed
          </Button>
          <Button color="primary" onClick={handleDoneClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={cancelOpen}>
        <DialogTitle>Cancel request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you cancel the requests the product quantity will not change.
            <br /> Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={() => handleCancelRequest(id)}>
            Yes
          </Button>
          <Button color="primary" onClick={handleCancelClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={detailsOpen}>
        <DialogTitle>Request details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Requests's product:
            <strong>
              {" "}
              {requestDetail.product ? requestDetail.product.name : ""}
            </strong>
            <br />
            Quantity to be transported:
            <strong>
              {" "}
              {requestDetail.quantity ? requestDetail.quantity : ""}
            </strong>
            <br />
            From:{" "}
            <strong>
              {requestDetail.fromStorage
                ? requestDetail.fromStorage.zipcode +
                  " " +
                  requestDetail.fromStorage.city +
                  " " +
                  requestDetail.fromStorage.address
                : ""}
            </strong>
            <br />
            To:{" "}
            <strong>
              {requestDetail.toStorage
                ? requestDetail.toStorage.zipcode +
                  " " +
                  requestDetail.toStorage.city +
                  " " +
                  requestDetail.toStorage.address
                : ""}
            </strong>
            <br />
            Movement date:{" "}
            <strong>
              {requestDetail.movementDate ? requestDetail.movementDate : ""}
            </strong>
            <br />
            Status:{" "}
            <strong>{requestDetail.status ? requestDetail.status : ""}</strong>
            <br />
            User who requested:{" "}
            <strong>
              {requestDetail.userWhoRequested
                ? requestDetail.userWhoRequested.name
                : ""}
            </strong>
            <br />
            His/Her email:{" "}
            <strong>
              {requestDetail.userWhoRequested
                ? requestDetail.userWhoRequested.email
                : ""}
            </strong>
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={handleDetailsClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const RequestsDataTable = () => {
  const [rows, setRows] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [rowCountState, setRowCountState] = React.useState(total || 0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [sumStatus, setSumStatus] = React.useState({
    inProgress: 0,
    done: 0,
    cancelled: 0,
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 30,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fromStorage",
      headerName: "From",
      width: 200,
      valueGetter: (params) => params.row.fromStorage.city,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "toStorage",
      headerName: "To",
      width: 200,
      valueGetter: (params) => params.row.toStorage.city,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      valueGetter: (params) => params.row.product.name,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "movementDate",
      headerName: "Date",
      width: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ActionsColumn
          id={params.row.id}
          handleLoadData={handleLoadData}
          page={paginationModel.page}
          size={paginationModel.pageSize}
          status={params.row.status}
          loadStatus={loadStatus}
        />
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
    RequestMovementService.findAllForUser(page, size, localStorage.getItem("loggedid"))
      .then((res) => {
        setTotal(res.data.totalElements);
        setRows(res.data.content);
      })
      .catch((error) => {
        console.error("Error loading requests:", error);
      });
  };

  const loadStatus = () => {
    RequestMovementService.getStatus(localStorage.getItem("loggedid")).then((res) => {
      if (res.data) {
        setSumStatus({
          inProgress: res.data[0],
          done: res.data[1],
          cancelled: res.data[2],
        });
      }
    });
  };

  useEffect(() => {
    handleLoadData(paginationModel.page, paginationModel.pageSize, false);
    loadStatus();
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
          Here are your product movement requests. You can accept them if it's
          done, cancel them to undo the request if it's can not be done, or see
          the details.
        </h4>
        <p>
  Total request with "<strong style={{color:'orange'}}>In Progress...</strong>" status:
  <strong style={{color:'orange'}}> {sumStatus.inProgress}</strong> <br />
  Total request with "<strong style={{color:'green'}}>Done</strong>" status:
  <strong style={{color:'green'}}> {sumStatus.done}</strong> <br />
  Total request with "<strong style={{color:'red'}}>Cancelled</strong>" status:
  <strong style={{color:'red'}}> {sumStatus.cancelled}</strong>
</p>
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

export default RequestsDataTable;
