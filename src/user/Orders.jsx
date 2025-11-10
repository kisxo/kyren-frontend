import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import DashboardLayout from "./components/DashboardLayout";
import "./Orders.css";
import { useNavigate } from "react-router";
import axios, { all } from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [allOrders, setAllOrders] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setAllOrders(res.data.data.reverse());
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
      // getUSerOrderStatus();
    }
  }, [user]);

  return (
    <Layout>
      <DashboardLayout>
        <div className="user-order-container">
          {loading ? (
            <div className="loader-container text-center">
              <span className="loader"></span>
            </div>
          ) : allOrders && allOrders?.length === 0 ? (
            <div className="no-order-found">
              <b>No Order Found</b>
              <button
                className="btn text-decoration-underline"
                onClick={() => navigate("/phone-skins")}
              >
                Go to Shop
              </button>
            </div>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>
                    <small>Order ID</small>
                  </th>
                  <th>
                    <small>Product</small>
                  </th>
                  <th>
                    <small>Date</small>
                  </th>
                  <th>
                    <small>Status</small>
                  </th>
                  <th>
                    <small>Total</small>
                  </th>
                  <th>
                    <small>Action</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {allOrders?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <small>{item?.orderId}</small>
                      </td>
                      <td>
                        <small>{item?.productinfo}</small>
                      </td>
                      <td>
                        <small>
                          {item?.createdAt
                            ? new Date(item?.createdAt).toLocaleString(
                                "default",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  second: "numeric",
                                }
                              )
                            : ""}
                        </small>
                      </td>
                      <td>
                        <small
                          className={
                            item?.status === "pending"
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {item?.status}
                        </small>
                      </td>
                      <td>
                        <small>{item?.amount}</small>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            navigate(`/view-order/${item?.orderId}`)
                          }
                          className="view-btn"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default Orders;
