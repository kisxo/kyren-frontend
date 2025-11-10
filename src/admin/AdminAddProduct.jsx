import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import "./AdminUsers.css";
import { useNavigate } from "react-router";
import axios from "axios";
import "./AdminAddProduct.css";
import { message } from "antd";
import { AppUrl } from "../utils/appData";

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [yokcash, setYokcash] = useState(null);
  const [moogold, setMoogold] = useState(null);
  const [servers, setServers] = useState(null);

  const [form, setForm] = useState({
    name: "",
    desc: "",
    category: "",
    api: "",
    apiName: "",
    gameName: "",
    region: "",
    stock: "Yes",
    images: [],
  });
  const [cost, setCost] = useState([
    { id: "", amount: "", price: "", pimg: "", resPrice: "" },
  ]);

  const handleAddCostField = (index) => {
    const updatedCost = [...cost];
    updatedCost.splice(index + 1, 0, {
      id: "",
      amount: "",
      price: "",
      pimg: "",
      resPrice: "",
    });
    setCost(updatedCost);
  };
  const handleRemoveCostField = (index) => {
    const updatedCost = [...cost];
    updatedCost.splice(index, 1);
    setCost(updatedCost);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setForm({ ...form, [name]: e.target.files });
    } else if (
      name.startsWith("id") ||
      name.startsWith("amount") ||
      name.startsWith("price") ||
      name.startsWith("pimg") ||
      name.startsWith("resPrice")
    ) {
      const index = parseInt(name.split("-")[1]);
      const updatedCost = [...cost];
      const property = name.startsWith("amount")
        ? "amount"
        : name.startsWith("price")
        ? "price"
        : name.startsWith("pimg")
        ? "pimg"
        : name.startsWith("resPrice")
        ? "resPrice"
        : "id";
      updatedCost[index][property] = value;
      setCost(updatedCost);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", form?.name);
    formData.append("api", form?.api);
    formData.append("apiName", form?.apiName);
    formData.append("gameName", form?.gameName);
    formData.append("region", form?.region);
    formData.append("stock", form?.stock);
    formData.append("desc", form?.desc);
    formData.append("category", form?.category);
    formData.append("cost", JSON.stringify(cost));
    formData.append("image", selectedFile);

    setLoading(true);

    try {
      const res = await axios.post(AppUrl +"/api/product/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        setLoading(false);
        navigate("/admin-products");
      } else {
        setLoading(false);
        message.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading files:", error);
    }
  };

  const getMobileLegendGame = async () => {
    try {
      const res = await axios.post(
        AppUrl +"/api/product/get-mobile-legend",
        { region: form?.region },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (res.data.success) {
        setData(res.data.data.product);
      } else {
        message.error("Api Error, Try after sometime");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (form?.region !== "") {
      getMobileLegendGame();
    }
  }, [form?.region]);

  const fetchYokcashServices = async () => {
    try {
      const res = await axios.post(AppUrl +"/api/yokcash/get-yokcash", {
        gameName: form?.gameName,
      });
      if (res.data.success) {
        setYokcash(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchMoogoldServices = async () => {
    try {
      const res = await axios.post(AppUrl +"/api/moogold/moogold-product", {
        product_id: form?.gameName,
      });
      if (res.data.success) {
        setMoogold(res.data.data.Variation);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchMoogoldServers = async () => {
    try {
      const res = await axios.post(AppUrl +"/api/moogold/moogold-servers", {
        product_id: form?.gameName,
      });
      if (res.data.success) {
        setServers(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    if (form?.apiName === "yokcash" && form?.gameName !== "") {
      fetchYokcashServices();
    } else if (form?.apiName === "moogold" && form?.gameName !== "") {
      fetchMoogoldServices();
      fetchMoogoldServers();
    }
  }, [form?.gameName]);

  return (
    <AdminLayout>
      <div className="admin-users-container">
        <div className="page-title">
          <h3 className="m-0">Add Product</h3>
        </div>
        <hr />
        <div className="add-product-container">
          <div className="form-fields mb-3">
            <input
              className="w-100"
              aria-label="Select Image"
              type="file"
              accept=".jpg, .jpeg, .png, .webp"
              name="image"
              required
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <div className="form-fields mb-3">
            <input
              className="w-100"
              name="name"
              onChange={handleChange}
              value={form?.name}
              type="text"
              placeholder="Enter name"
            />
          </div>
          <div className="form-fields mb-3">
            <textarea
              style={{ border: "1px solid #000" }}
              name="desc"
              id=""
              cols="30"
              rows="3"
              placeholder="Description"
              className="form-control"
              onChange={handleChange}
              value={form?.desc}
            ></textarea>
          </div>

          <div className="form-fields mb-3">
            <select
              onChange={handleChange}
              value={form?.api}
              name="api"
              className="w-100"
            >
              <option value="">API BASED?</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {form?.api === "yes" && (
            <div className="form-fields mb-3">
              <select
                onChange={handleChange}
                value={form?.apiName}
                name="apiName"
                className="w-100"
              >
                <option value="">Select API</option>
                <option value="smileOne">Smile One Api</option>
                {/* <option value="moogold">Moogold</option> */}
              </select>
            </div>
          )}
          {form?.api === "yes" && form?.apiName === "moogold" && (
            <div className="form-fields mb-3">
              <select
                onChange={handleChange}
                value={form?.gameName}
                name="gameName"
                className="w-100"
              >
                <option value="">Select Game</option>
                <option value="428075">Genshin Impact</option>
                <option value="9477186">Zenless Zone Zero</option>
                <option value="4427071">Clash of clans</option>
                <option value="6963">PUBG Global</option>
                <option value="15145">Mobile Legends</option>
                <option value="4233885">Honkai Star Rails</option>
                <option value="4427073">Brawl Star</option> PlayerTag
                <option value="5177311">Honor of Kings</option> PlayerID
                RoleName
              </select>
            </div>
          )}
          {form?.api === "yes" && form?.apiName === "smileOne" && (
            <div className="form-fields mb-3">
              <select
                onChange={handleChange}
                value={form?.region}
                name="region"
                className="w-100"
              >
                <option value="">Select Region</option>
                <option value="brazil">Brazil</option>
                <option value="philippines">Philippines</option>
              </select>
            </div>
          )}
          <div className="form-fields mb-3">
            <label htmlFor="" className="text-dark">
              <small>Stock</small>
            </label>
            <select
              onChange={handleChange}
              value={form?.stock}
              name="stock"
              className="w-100"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {cost &&
            cost?.map((item, index) => (
              <div className="d-flex form-fields mb-3" key={index}>
                <input
                  className="w-100"
                  name={`id-${index}`}
                  onChange={handleChange}
                  value={cost[index]?.id || ""}
                  type="text"
                  placeholder="Enter id"
                />
                <input
                  className="w-100"
                  name={`amount-${index}`}
                  onChange={handleChange}
                  value={cost[index]?.amount || ""}
                  type="text"
                  placeholder="Enter Amount"
                />
                <input
                  className="w-100"
                  name={`price-${index}`}
                  onChange={handleChange}
                  value={cost[index]?.price || ""}
                  type="text"
                  placeholder="Enter Price"
                />
                <input
                  className="w-100"
                  name={`resPrice-${index}`}
                  onChange={handleChange}
                  value={cost[index]?.resPrice || ""}
                  type="text"
                  placeholder="Enter reseller price"
                />
                <button onClick={() => handleAddCostField(index)}>+</button>
                {index > 0 && (
                  <button onClick={() => handleRemoveCostField(index)}>
                    -
                  </button>
                )}
              </div>
            ))}
          <button className="w-100 py-3" onClick={handleAddProduct}>
            Add
          </button>
        </div>
      </div>

      {/* API PRO LIST  */}
      {form?.apiName === "smileOne" && data && (
        <table className="table mt-5 bg-white text-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>SPU</th>
              <th>PRICE</th>
              <th>COST PRICE</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td>{item?.id}</td>
                  <td>{item.spu}</td>
                  <td>{item.price}</td>
                  <td>{item.cost_price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {form?.apiName === "moogold" && moogold && (
        <table className="table mt-5 bg-white text-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {moogold &&
              moogold?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.variation_id}</td>
                    <td>{item?.variation_name}</td>
                    <td>{item.variation_price}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
};

export default AdminAddProduct;
