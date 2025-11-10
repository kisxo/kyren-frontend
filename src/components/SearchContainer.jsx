import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./SearchContainer.css";
import { AppUrl } from "../utils/appData";

const SearchContainer = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [query, setQuery] = useState("");
  const [filterProduct, setFilterProduct] = useState(null);
  const [noResult, setNoResult] = useState(false);

  const handleFilterProduct = (e) => {
    const searchText = e.target.value.toLowerCase();
    setQuery(searchText);
  };

  useEffect(() => {
    const filteredProducts = products?.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilterProduct(filteredProducts);

    // Check for no results
    setNoResult(query !== "" && filteredProducts?.length === 0);
  }, [query, products]);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(AppUrl + "/api/product/get-all-products");
      if (res.data.success) {
        setProducts(res.data.data.reverse());
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className={`search-container ${search ? "active" : ""}`}>
      <div className="search-tool">
        <SearchIcon className="icon" />
        <input
          placeholder="Search"
          type="text"
          onChange={handleFilterProduct}
        />
        <CloseIcon className="icon" onClick={() => setSearch(!search)} />
      </div>
      <hr />
      {query !== "" && (
        <div className="search-box">
          {filterProduct &&
            filterProduct?.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/product/${item?.name}`);
                    setSearch(!search);
                  }}
                  key={index}
                  className="product search-product"
                >
                  <img
                    src={`https://topupplayground.com/${item?.images[0]}`}
                    alt=""
                  />
                  <div className="product-name mt-2">
                    <h6>{item?.name}</h6>
                  </div>
                </div>
              );
            })}
          <span className="text-center">
            {noResult && <h2>No Result Found</h2>}
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
