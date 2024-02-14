import axios from "axios";
import React from "react";

const PRODUCT_API_URL = "http://localhost:8080/api/product/";
const ProductsService = {
  getAllProducts: (page, size) => {
    return axios.get(PRODUCT_API_URL + "find" + "?page=" + page + "&size=" + size)
  },
  searchByParameters: (page, size, name, id, category) => {
    const requestBody = {
      name: name,
      id: id,
      categoryName: category
    };

    return axios.post(PRODUCT_API_URL + "findbyparameter" + "?page=" + page + "&size=" + size, requestBody)
  },
  delete: (id) => {
    return axios.post(PRODUCT_API_URL + "delete/" + id);
  }
};

export default ProductsService;
