import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Dashboard.css";
import { useLocation, useNavigate, useParams } from "react-router";
import DashboardLayout from "./components/DashboardLayout";
import { message } from "antd";
import getUserData from "../utils/userDataService";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [allOrders, setAllOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    getUserData(null, null, setBalance);
  }, []);

  const getAllUserOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/order/get-user-orders",
        { email: user?.email },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setAllOrders(res.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      getAllUserOrders();
    }
  }, [user]);

  return (
    <Layout>
      <DashboardLayout>
        <div className="user-dashboard">
          <div
            className="dash-card dash w-100 w-lg-50"
            onClick={() => navigate("/orders")}
          >
            <div className="count">
              <h1 className="m-0">
                <b>{allOrders?.length || 0}</b>
              </h1>
              <span className="text-muted">Orders</span>
            </div>
            {/* <InstallMobileIcon className="icon" /> */}
          </div>
          {/* <div
            className="dash-card dash w-100 w-lg-50"
            onClick={() => navigate("/wallet")}
          >
            <div className="count">
              <h1 className="m-0">
                <b>{balance || 0}</b>
              </h1>
              <span className="text-muted">Wallet</span>
            </div>
            <AccountBalanceWalletIcon className="icon" />
          </div> */}
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default Dashboard;
