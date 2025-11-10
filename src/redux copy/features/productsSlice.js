import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import axios from "axios";
import { AppUrl } from "../../utils/appData";

async function getAllProducts(){
  try {
    const res = await axios.get(
      AppUrl + "/api/product/get-all-products"
    );
    if (res.data.success) {
      return res.data.data;
    } 
  } catch (error) {
    console.log(error);
  }
}

export const productsSlice =  createSlice({
  name: "productsList",
  initialState: { productsList: await getAllProducts()},
})