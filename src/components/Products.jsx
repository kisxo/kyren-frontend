import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router";

const Products = ({ title }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/product/get-all-products");
      if (res.data.success) {
        setProducts(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="products-container">
      <div className="product-title text-center">
        {products?.length > 0 && <h1>{title}</h1>}
        <div className="products">
          {products &&
            products.map((product, index) => {
              return (
                <div
                  onClick={() => navigate(`/product/${product?.name}`)}
                  key={index}
                  className="product text-start"
                >
                  <div
                    className={`product-img-cont loading ${
                      loading && "active"
                    }`}
                  >
                    <img src={product?.images[0]} alt="" />
                  </div>
                  <div className="product-name">
                    <h6>{product?.name}</h6>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Products;
