import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import DashboardLayout from "./components/DashboardLayout";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";

const Account = () => {
  const { user } = useSelector((state) => state.user);
  const [form, setForm] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/user-profile-update", form);
      if (res.data.success) {
        setForm({ ...form, password: "" });
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    axios
      .post(
        "/api/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setForm(res.data.data.user);
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <DashboardLayout>
        <div className="user-accout-details" style={{ minHeight: "300px" }}>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-12 col-lg-6">
              <div className="col-12">
                <div className="form-fields mb-3">
                  <label htmlFor="" className="form-label text-white">
                    Email
                  </label>
                  <h6 className="text-white">{user?.email}</h6>
                </div>
              </div>
              <div className="col-12">
                <div className="form-fields mb-3">
                  <label htmlFor="" className="form-label text-white">
                    Password
                  </label>
                  <input
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <button onClick={handleUpdate} className="add-to-cart-btn w-100">
                Update
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default Account;
