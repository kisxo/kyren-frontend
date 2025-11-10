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
    price: "",
    desc: "",
    category: "",
    gameName: "",
    socialName: "",
    status: "available",
    region: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", form?.name);
    formData.append("price", form?.price);
    formData.append("desc", form?.desc);
    formData.append("category", form?.category);
    if (form?.category === "game") {
      formData.append("gameName", form?.gameName);
    }else if (form?.category === "social") {
      formData.append("socialName", form?.socialName);
    }
    formData.append("status", "available");
    formData.append("image", selectedFile);
    formData.append("region", form?.region);
  
    setLoading(true);

    try {
      const res = await axios.post(AppUrl +"/api/account/add-account", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        setLoading(false);
        navigate("/admin-accounts");
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
          <h3 className="m-0">Add Account</h3>
        </div>
        <hr />
        <div className="add-product-container">
          <label className="form-label text-black mt-2">Account Image</label>
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

          <label className="form-label text-black mt-2">Name</label>
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

          <label className="form-label text-black mt-2">Price</label>
          <div className="form-fields mb-3">
            <input
              className="w-100"
              name="price"
              onChange={handleChange}
              value={form?.price}
              type="number"
              placeholder="Enter Price"
            />
          </div>

          <label className="form-label text-black mt-2">Region</label>
          <div className="form-fields mb-3">
            <select
              onChange={handleChange}
              value={form?.region}
              name="region"
              className="w-100"
            >
              <option value="" disabled>Region</option>
              <option value="global">Global</option>
              <option value="india">India</option>
            </select>
          </div>

          <label className="form-label text-black mt-2">Description</label>
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

          <label className="form-label text-black mt-2">Category</label>
          <div className="form-fields mb-3">
            <select
              onChange={handleChange}
              value={form?.category}
              name="category"
              className="w-100"
            >
              <option value="" disabled>Category</option>
              <option value="game">Game Account</option>
              <option value="social">Social Account</option>
            </select>
          </div>

          {form?.category === "game" ? (
            <>
            <label className="form-label text-black mt-2">Game Name</label>
            <div className="form-fields mb-3">
              <select
                onChange={handleChange}
                value={form?.gameName}
                name="gameName"
                className="w-100"
              >
                <option value="" disabled>Select Game</option>
                <option value="mlbb">MLBB</option>
                <option value="bgmi">BGMI</option>
                <option value="freefire">FreeFire</option>
              </select>
            </div>
            </>
          ) : form?.category === "social" && (
            <>
            <label className="form-label text-black mt-2">Social Name</label>
            <div className="form-fields mb-3">
              <select
                onChange={handleChange}
                value={form?.socialName}
                name="socialName"
                className="w-100"
              >
                <option value="" disabled>Select Social Name</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
              </select>
            </div>
            </>
          )}

          <label className="form-label text-black mt-2">Status</label>
          <div className="form-fields mb-3">
            <select
              onChange={handleChange}
              value={form?.status}
              name="status"
              className="w-100"
            >
              <option value="" disabled>Status</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="processing">Processing</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <button className="w-100 py-3" onClick={handleAddProduct}>
            Add
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddProduct;
