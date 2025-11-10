import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import DashboardLayout from "./components/DashboardLayout";
import axios from "axios";
import { useParams } from "react-router";
import { message } from "antd";

const ViewOrder = () => {
  const params = useParams();
  const [singleOrder, setSingleOrder] = useState(null);

  const getOrderById = async () => {
    try {
      const res = await axios.post(
        "/api/order/get-order-by-id",
        {
          orderId: params?.orderId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setSingleOrder(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderById();
  }, []);
  return (
    <Layout>
      <DashboardLayout>
        <div className="no-order-found">
          <span>
            Order #{singleOrder?.orderId} was place on{" "}
            {singleOrder?.createdAt
              ? new Date(singleOrder.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}{" "}
            and is currently {singleOrder?.status}
          </span>
        </div>
        <h4 className="mt-4 text-white">Order Details</h4>
        <hr />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{singleOrder?.orderId}</td>
            </tr>
            <tr>
              <td>{singleOrder?.productinfo}</td>
              <td>Rs. {singleOrder?.amount}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{singleOrder?.status}</td>
            </tr>
            <tr>
              <td>Order Details</td>
              <td>{singleOrder?.orderDetails}</td>
            </tr>
            <tr>
              <td>Player ID/User ID/Other</td>
              <td>{singleOrder?.userId}</td>
            </tr>
            {singleOrder?.zoneId && (
              <tr>
                <td>Zone ID</td>
                <td>{singleOrder?.zoneId}</td>
              </tr>
            )}
            <tr>
              <td>Date</td>
              <td>
                {singleOrder?.createdAt
                  ? new Date(singleOrder.createdAt).toLocaleDateString(
                      "en-US",
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
              </td>
            </tr>
          </tbody>
        </table>
      </DashboardLayout>
    </Layout>
  );
};

export default ViewOrder;
