import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Games from "../components/Games";
import "./ProductPage.css";
import { ApiUrl } from "../utils/appData";

const ProductPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Game");
  const [products, setProducts] = useState(null);
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(false);

  async function getAllProducts() {
    try {
      const res = await axios.get(ApiUrl + "/api/product/get-all-products");
      if (res.data.success) {
        setProducts(res.data.data);
        setData(res.data.data.reverse());
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <Games />
    </Layout>
  );
};

export default ProductPage;
