import axios from "axios";
import React from "react";

const ORDER_API_URL = "http://localhost:8080/api/order/";
const OrderService = {
  getAllOrders: (page, size) => {
    return axios.get(ORDER_API_URL + "findall" + "?page=" + page + "&size=" + size)
  },
  
};

export default OrderService;
