import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { message } from "antd";
import axios from "axios";
import "./AdminUsers.css";
// import IMAGES from "../img/image";
import { Link, useNavigate, useParams } from "react-router";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const AdminUsers = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [allUser, setAllUser] = useState(null);
  const [originalUserData, setOriginalUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  function handleClearFilter() {
    setAllUser(originalUserData);
    setSearchEmail("");
    setSelectedType("");
    setSelectedDate("");
    setSelectedMonth("");
  }

  const getAllOrders = async (e) => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/admin-get-all-orders", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setAllUser(res.data.data);
        setOriginalUserData(res.data.data.reverse());
        setLoading(false);
      } else {
        setLoading(false);
        message.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  //! Search
  const handleSearch = () => {
    if (originalUserData) {
      const filteredUsers = originalUserData.filter((order) => {
        const emailMatch =
          order.email &&
          order.email.toLowerCase().includes(searchEmail.toLowerCase());

        const typeMatch =
          selectedType === ""
            ? true
            : order.api &&
              order.api === (selectedType === "yes" ? "yes" : "no");

        const dateMatch =
          order.createdAt &&
          (!selectedDate ||
            new Date(order.createdAt).toISOString().split("T")[0] ===
              new Date(selectedDate).toISOString().split("T")[0]);

        const monthMatch =
          order.createdAt &&
          (!selectedMonth ||
            new Date(order.createdAt).getMonth() === Number(selectedMonth) - 1);

        return emailMatch && typeMatch && dateMatch && monthMatch;
      });
      setAllUser(filteredUsers);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchEmail, selectedType, selectedDate, selectedMonth]);

  return (
    <AdminLayout>
      <div className="admin-users-container">
        <div className="page-title">
          <h3 className="m-0">Orders</h3>
          <h6>Total Orders - {allUser?.length}</h6>
        </div>
        <hr />
        <div className="table-container">
          <div className="tools mb-5">
            <div className="form-fields">
              <input
                className="border"
                type="search"
                name="email"
                placeholder="Search by Email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
            </div>
            <div className="form-fields">
              <select
                className="text-dark"
                name="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="yes">Api Orders</option>
                <option value="no">Manual Orders</option>
              </select>
            </div>
            <div className="form-fields">
              <input
                type="date"
                name="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="form-fields">
              <select
                className="text-dark"
                name="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <button
              className="bg-danger px-3"
              onClick={() => handleClearFilter()}
            >
              Clear Filter
            </button>
          </div>
          {loading ? (
            <div className="loading-container">
              <div className="loader">
                <span className="loader-text">loading</span>
                <span className="load"></span>
              </div>
            </div>
          ) : (
            <table className="table user-table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Order Type</th>
                  <th>Product</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {allUser &&
                  allUser?.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <small>{user?.orderId}</small>
                        </td>
                        <td>
                          <small>
                            {user?.api === "no" ? "Manual Order" : "Api Order"}
                          </small>
                        </td>
                        <td>
                          <small>{user?.productinfo}</small>
                        </td>
                        <td>
                          <small>{user?.email}</small>
                        </td>
                        <td>
                          <small>Rs.{user?.amount}</small>
                        </td>
                        <td>
                          <small
                            className={
                              user?.status === "pending"
                                ? "text-danger"
                                : "text-success"
                            }
                          >
                            {user?.status}
                          </small>
                        </td>
                        <td>
                          <small>
                            {new Date(user?.createdAt).toLocaleString(
                              "default",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                              }
                            )}
                          </small>
                        </td>
                        <td align="center">
                          <small>
                            <RemoveRedEyeIcon
                              onClick={() =>
                                navigate(`/admin-view-order/${user?.orderId}`)
                              }
                            />
                          </small>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
