import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import axios from "axios";
import { message } from "antd";

const AdminPayments = () => {
  const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getAllPayments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/payment/get-all-payments", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setPayments(res.data.data?.reverse());
        setLoading(false);
      } else {
        setLoading(false);
        message.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPayments();
  }, []);

  return (
    <AdminLayout>
      <div className="page-title">
        <h3 className="m-0">Payments</h3>
        <h6>Total Payments - {payments?.length}</h6>
      </div>
      <hr />
      <div className="admin-queries">
        <div className="tools">
          <div className="form-fields">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="py-2"
              name="search"
              type="text"
              placeholder="Search by email"
            />
          </div>
        </div>
        <table className="table query-table">
          <thead>
            <tr>
              <th>TxnId</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Mobile</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          {loading ? (
            <div className="loader-container text-center">
              <span className="loader"></span>
            </div>
          ) : (
            <tbody>
              {payments &&
                payments
                  ?.filter((item) =>
                    item?.email.includes(search?.toLowerCase())
                  )
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <small>{item?.orderId}</small>
                        </td>
                        <td>
                          <small>{item?.email}</small>
                        </td>
                        <td>
                          Rs. <small>{item?.amount}</small>
                        </td>
                        <td>
                          <small>{item?.mobile}</small>
                        </td>
                        <td>
                          <small>
                            {new Date(item?.createdAt).toLocaleString(
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
                        <td>
                          <small>{item?.status}</small>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          )}
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminPayments;
