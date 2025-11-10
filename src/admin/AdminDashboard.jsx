import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import "./AdminDashboard.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { message } from "antd";
import { AppUrl } from "../utils/appData";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(AppUrl +"/api/admin/admin-get-all-orders", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setData(res.data.data.reverse());
        setOrders(res.data.data.reverse());
        setTotal(res.data.total);
        const filteredOrders = selectedMonth
          ? res.data.data.filter((order) => {
              return (
                new Date(order.createdAt).getMonth() + 1 ===
                Number(selectedMonth)
              );
            })
          : res.data.data;

        const ordersData = filteredOrders.reverse();
        const userTotalAmounts = {};
        ordersData.forEach((order) => {
          const userEmail = order.email;
          const orderPrice = parseFloat(order.amount);
          if (!userTotalAmounts[userEmail]) {
            userTotalAmounts[userEmail] = 0;
          }
          userTotalAmounts[userEmail] += orderPrice;
        });

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // PRODUCTS
  const getAllProducts = async () => {
    try {
      const res = await axios.get(AppUrl +"/api/product/get-all-products");
      if (res.data.success) {
        setProducts(res.data.data.reverse());
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formattedTotal =
    total >= 1000
      ? total % 1000 === 0
        ? `${total / 1000}k`
        : `${(total / 1000).toFixed(1)}k`
      : total;

  const formattedOrder =
    orders?.length >= 1000
      ? orders?.length % 1000 === 0
        ? `${orders?.length / 1000}k`
        : `${(orders?.length / 1000).toFixed(1)}k`
      : orders?.length;

  useEffect(() => {
    getAllOrders();
    getAllProducts();
  }, [selectedMonth]);

  return (
    <AdminLayout>
      <div className="page-title">
        <h3 className="m-0">Dashboard</h3>
      </div>
      <hr />
      <div className="admin-dashboard-container p-0">
        <div className="dash-card" onClick={() => navigate("/admin-orders")}>
          <div className="count">
            <h1 className="m-0">
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <b>{formattedOrder || 0}</b>
              )}
            </h1>
            <span>Total Orders</span>
          </div>
          <PointOfSaleIcon className="icon" />
        </div>
        <div className="dash-card" onClick={() => navigate("/admin-products")}>
          <div className="count">
            <h1 className="m-0">
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <b>{products?.length || 0}</b>
              )}
            </h1>
            <span>Total Products</span>
          </div>
          <StayCurrentPortraitIcon className="icon" />
        </div>
        <div className="dash-card" onClick={() => navigate("/admin-payments")}>
          <div className="count">
            <h1 className="m-0">
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <b>{formattedTotal || 0}</b>
              )}
            </h1>
            <span>Total Sales</span>
          </div>
          <MonetizationOnIcon className="icon" />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
