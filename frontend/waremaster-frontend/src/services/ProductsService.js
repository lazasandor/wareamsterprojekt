import axios from "axios";
import React from "react";

const PRODUCT_API_URL = "http://localhost:8080/api/product/";
const CATEGORY_API_URL = "http://localhost:8080/api/category/"
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
  },
  getById: (id) => {
    return axios.get(PRODUCT_API_URL + "findbyid/" + id);
  },
  getCategoryByName: (name) => {
    return axios.get(CATEGORY_API_URL + "findbyname/" + name)
  },
  update: (data) => {
    const requestBody = {
      id: data.id,
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      price: data.price,
      description: data.description
    }
    return axios.post(PRODUCT_API_URL + "update", requestBody)
  },
  save: (data) => {
    const requestBody = {
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      price: data.price,
      description: data.description
    }
    return axios.post(PRODUCT_API_URL + "save", requestBody)
  },
};

export default ProductsService;
