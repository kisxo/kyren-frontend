import AdminLayout from "./components/DashboardLayout";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";
import { Eye } from "lucide-react"; // Replaces MUI icon
import { AppUrl } from "../utils/appData";

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

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(AppUrl + "/api/admin/admin-get-all-orders", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      if (res.data.success) {
        setAllUser(res.data.data);
        setOriginalUserData(res.data.data.reverse());
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (originalUserData) {
      const filteredUsers = originalUserData.filter((order) => {
        const emailMatch =
          order.email &&
          order.email.toLowerCase().includes(searchEmail.toLowerCase());

        const typeMatch =
          selectedType === ""
            ? true
            : order.api === (selectedType === "yes" ? "yes" : "no");

        const dateMatch =
          !selectedDate ||
          new Date(order.createdAt).toISOString().split("T")[0] ===
            new Date(selectedDate).toISOString().split("T")[0];

        const monthMatch =
          !selectedMonth ||
          new Date(order.createdAt).getMonth() === Number(selectedMonth) - 1;

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
      <div className="min-h-screen bg-neutral-950 text-neutral-200 p-4 rounded-xl w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-2">
          <div>
            <h3 className="text-2xl font-semibold text-white">Orders</h3>
            <p className="text-sm text-neutral-400">
              Total Orders — {allUser?.length || 0}
            </p>
          </div>
          <button
            onClick={handleClearFilter}
            className="mt-3 md:mt-0 bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition"
          >
            Clear Filter
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 bg-neutral-900/50 p-4 rounded-lg mb-6 border border-neutral-800">
          <input
            type="search"
            name="email"
            placeholder="Search by Email"
            className="bg-neutral-900 text-neutral-200 border border-neutral-700 px-3 py-2 rounded-md w-full sm:w-auto"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />

          <select
            name="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-neutral-900 text-neutral-200 border border-neutral-700 px-3 py-2 rounded-md"
          >
            <option value="">Select Type</option>
            <option value="yes">API Orders</option>
            <option value="no">Manual Orders</option>
          </select>

          <input
            type="date"
            name="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-neutral-900 text-neutral-200 border border-neutral-700 px-3 py-2 rounded-md"
          />

          <select
            name="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-neutral-900 text-neutral-200 border border-neutral-700 px-3 py-2 rounded-md"
          >
            <option value="">Select Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-neutral-800">
          {loading ? (
            <div className="flex justify-center items-center py-10 text-neutral-400 animate-pulse">
              Loading orders...
            </div>
          ) : (
            <table className="text-left border-collapse w-full">
              <thead className="bg-neutral-900 text-neutral-300 uppercase tracking-wide text-xs text-nowrap">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {allUser?.length ? (
                  allUser.map((user, i) => (
                    <tr
                      key={i}
                      className="border-t border-neutral-800 hover:bg-neutral-900/60 transition"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-neutral-400">
                        {user.orderId}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-md ${
                            user.api === "no"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-blue-500/10 text-blue-400"
                          }`}
                        >
                          {user.api === "no" ? "Manual" : "API"}
                        </span>
                      </td>
                      <td className="px-4 py-3">{user.productinfo}</td>
                      <td className="px-4 py-3 text-neutral-400">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">₹{user.amount}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`${
                            user.status === "pending"
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-400">
                        {new Date(user.createdAt).toLocaleString("default", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() =>
                            navigate(`/view-order/${user.orderId}`)
                          }
                          className="hover:text-blue-400 transition"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-10 text-neutral-500 italic"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
