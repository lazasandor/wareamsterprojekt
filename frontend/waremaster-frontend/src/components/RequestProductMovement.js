import { Label } from "@mui/icons-material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import StoragesService from "../services/StoragesService.js";
import { useEffect } from "react";
import { Input as BaseInput, inputClasses } from "@mui/base/Input";
import TextField from "@mui/material/TextField";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import RequestMovementService from "../services/RequestMovementService.js";

const RequestProductMovement = () => {
  const [requestFrom, setRequestFrom] = React.useState("");
  const [requestTo, setRequestTo] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState("");
  const [productForDetail, setProductForDetail] = React.useState("");
  const [storages, setStorages] = React.useState([]);
  const [productsToMove, setProductToMove] = React.useState([]);
  const [quantity, setQuantity] = React.useState(0);
  const [maxQuantity, setMaxQuantity] = React.useState(999999);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [detailStorageFrom, setDetailStorageFrom] = React.useState("");
  const [detailStorageTo, setDetailStorageTo] = React.useState("");
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [sum, setSum] = React.useState("");
  const [capacity, setCapacity] = React.useState("");
  const [capAlert, setCapAlert] = React.useState("");

  const handleFromChange = async (event) => {
    const s = await fetch(
      "http://localhost:8080/api/storage/findbyid/" + event.target.value
    );
    const res = await s.json();
    console.log(res);
    setDetailStorageFrom(res);
    setRequestFrom(event.target.value);
    await fetchProductsForStorage(event.target.value);
  };

  const handleToChange = async (event) => {
    const s = await fetch(
      "http://localhost:8080/api/storage/findbyid/" + event.target.value
    );
    const sum = await fetch("http://localhost:8080/api/storage/getsumbyid/" + event.target.value
    )
    const sumres = await sum.json();
    setSum(sumres);
    const res = await s.json();
    setCapacity(res.capacity)
    setDetailStorageTo(res);
    setRequestTo(event.target.value);
  };

  const handleProductChange = async (event) => {
    const s = await fetch(
      "http://localhost:8080/api/product/findbyid/" +
        event.target.value.product.id
    );
    const product = await s.json();
    setSelectedProduct(event.target.value);
    const selectedProduct = productsToMove.find(
      (product) => product.id === event.target.value
    );
    console.log(event.target.value);
    console.log(product)
    setProductForDetail(product);
    setMaxQuantity(event.target.value.quantity);
  };

  useEffect(() => {
    fetchStorages();
  }, []);

  const fetchProductsForStorage = async (storageid) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/product/findbystorageid/" + storageid
      );
      const result = await response.json();
      setProductToMove(result);
    } catch {
      console.error("error fetchin storages");
    }
  };

  const fetchStorages = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/storage/findall");
      const result = await response.json();
      setStorages(result);
    } catch {
      console.error("error fetchin storages");
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const checkInputFields = () => {
    if (!requestFrom || !requestTo || !selectedProduct || !quantity) {
      setAlertOpen(true);
      return;
    }
    if (!quantity || Number(quantity) > maxQuantity) {
      console.log(maxQuantity)
      console.log("fasz")
      setAlertOpen(true);
      return;
    }
    if (requestTo === requestFrom) {
      setAlertOpen(true);
      return;
    }
    if (Number(quantity) + Number(sum) > capacity){
      setCapAlert("Not enough space!")
      return;
    }
    console.log(maxQuantity)
    
    setDetailOpen(true);
  };

  const handleRequestSubmit = () => {
    setCapAlert("");
    checkInputFields();
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleDetailsClose = () => {
    setDetailOpen(false);
  };

  const handleSuccessOpen = () => {
    setSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    window.location.reload();
  };

  const handleDetailsProceed = async () => {
    const user = await fetch(
      "http://localhost:8080/api/user/findbyid/" +
        localStorage.getItem("loggedid")
    );
    const userJson = await user.json();
    console.log(productForDetail);
    RequestMovementService.save(
      detailStorageFrom,
      detailStorageTo,
      quantity,
      productForDetail,
      userJson
    ).then((res) => {
      if (res.data) {
        handleSuccessOpen();
      }
    });

    setDetailOpen(false);
  };

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
                {storages.map((storages) => (
                  <MenuItem key={storages.id} value={storages.id}>
                    {storages.zipcode} {storages.city} {storages.address}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h4 style={{ marginRight: 10, width: 250 }}>
              Storage to move product to:<br/>
              <strong>Capacity: </strong>
              <strong>{sum}/{detailStorageTo.capacity}</strong>
            </h4>
            <FormControl sx={{ width: 400 }}>
              <InputLabel>To</InputLabel>
              <Select value={requestTo} label="To" onChange={handleToChange}>
                {storages.map((storages) => (
                  <MenuItem key={storages.id} value={storages.id}>
                    {storages.zipcode} {storages.city} {storages.address}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 20,
              marginTop: 20,
            }}
          >
            <h4 style={{ marginRight: 10, width: 250 }}>
              Product you would like to move:
            </h4>
            <FormControl sx={{ width: 400 }}>
              <InputLabel>Product</InputLabel>
              <Select
                value={selectedProduct}
                label="From"
                onChange={handleProductChange}
              >
                {productsToMove.map((productsToMove) => (
                  <MenuItem key={productsToMove.id} value={productsToMove}>
                    {productsToMove.product.name} ({productsToMove.quantity})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 20,
              marginTop: 20,
            }}
          >
            <h4 style={{ marginRight: 10, width: 250 }}>Quantity: <br/> <strong style={{color:'red'}}>{capAlert}</strong></h4>
            <TextField
              label="Quantity"
              variant="outlined"
              type="number"
              onChange={handleQuantityChange}
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="warning"
            variant="contained"
            sx={{ marginTop: 5 }}
            onClick={handleRequestSubmit}
          >
            Send Request
          </Button>
        </div>
      </div>
      <Dialog open={alertOpen}>
        <DialogTitle>Wrong input</DialogTitle>
        <DialogContent>
          Please fill out all fields.
          <br />
          <br />
          Ensure that the quantity to be transported does not exceed the actual
          quantity of the item.
          <br />
          <br />
          Ensure the storage from which you wish to transport differs from the
          destination storage.
          <br />
          <br />
        </DialogContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleAlertClose}
            color="warning"
            variant="contained"
            sx={{ width: 0, marginBottom: 2 }}
          >
            Close
          </Button>
        </div>
      </Dialog>
      <Dialog open={detailOpen}>
        <DialogTitle>Request Details</DialogTitle>
        <DialogContent>
          Your request:
          <br />
          <br />
          To transport from:{" "}
          <strong>
            {detailStorageFrom.zipcode} {detailStorageFrom.city}{" "}
            {detailStorageFrom.address}{" "}
          </strong>
          <br />
          <br />
          Transport to:{" "}
          <strong>
            {detailStorageTo.zipcode} {detailStorageTo.city}{" "}
            {detailStorageTo.address}{" "}
          </strong>
          <br />
          <br />
          Product to transport: <strong>{productForDetail.name} </strong>
          <br />
          <br />
          Quantity to transport: <strong>{quantity} </strong>
          <br />
          <br />
          Do you proceed?
        </DialogContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleDetailsProceed}
            color="warning"
            variant="contained"
            sx={{ width: 0, marginBottom: 2, marginRight: 2, width: 80 }}
          >
            Proceed
          </Button>
          <Button
            onClick={handleDetailsClose}
            color="warning"
            variant="contained"
            sx={{ width: 0, marginBottom: 2 }}
          >
            Close
          </Button>
        </div>
      </Dialog>
      <Dialog open={successOpen}>
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          Your request set successfully! <br />
          You can check the details at the "Requests" tab.
        </DialogContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleSuccessClose}
            color="warning"
            variant="contained"
            sx={{ width: 0, marginBottom: 2 }}
          >
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default RequestProductMovement;
