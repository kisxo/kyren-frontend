import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { useNavigate, useParams } from "react-router";
import "./AdminViewOrder.css";
import axios from "axios";
import { message } from "antd";

const AdminViewOrder = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [singleOrder, setSingleOrder] = useState(null);
  const [status, setStatus] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/admin/update-order",
        {
          status,
          id: singleOrder?._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/admin-orders");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        setStatus(res.data.data.status);
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
    <AdminLayout>
      <div className="admin-users-container">
        <div className="page-title">
          <h3 className="m-0">Order Details</h3>
          <br />
        </div>
        <div className="admin-view-order-container">
          <div className="admin-order-details-container">
            <h5 className="m-0">Order #{singleOrder?.client_txn_id}</h5>
            <div className="admin-order-item-details">
              <h5 className="m-0 mb-3">Order Item</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Order ID</td>
                    <td>{singleOrder?.orderId}</td>
                  </tr>
                  <tr>
                    <td>Game</td>
                    <td>{singleOrder?.productinfo}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>Rs. {singleOrder?.amount}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{singleOrder?.status}</td>
                  </tr>
                  <tr>
                    <td>Amount (Qty)</td>
                    <td>{singleOrder?.orderDetails}</td>
                  </tr>
                  <tr>
                    <td>PlayerId/UserId/Other</td>
                    <td>{singleOrder?.userId}</td>
                  </tr>
                  <tr>
                    <td>ZoneId</td>
                    <td>{singleOrder?.zoneId || "No Data"}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>
                      {singleOrder?.createdAt
                        ? new Date(singleOrder.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
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
            </div>
          </div>
          {/* ====================== ACTION ===================== */}
          <div className="admin-order-actions">
            <div className="form-fields">
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                name="status"
                className="form-select"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="success">Success</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Redunded</option>
                <option value="failed">Failed</option>
              </select>
              <button className="add-to-cart-btn w-100" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminViewOrder;
