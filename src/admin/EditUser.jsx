import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { useNavigate, useParams } from "react-router";
import { message } from "antd";
import axios from "axios";
import "./EditUser.css";

const EditUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/admin-edit-user", user, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/admin-users");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // get user
  const getUser = async () => {
    try {
      const res = await axios.post(
        "/api/admin/get-user",
        { id: params.id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setUser(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-users-container">
        <form>
          <div className="page-title">
            <h3 className="m-0">Edit User</h3>
            <button onClick={handleSubmit}>Update</button>
          </div>
          <div className="admin-edit-container">
            <div className="row">
              <div className="col-12">
                <div className="form-fields mb-3">
                  <label htmlFor="" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={user?.email}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-fields mb-3">
                  <label htmlFor="" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="fname"
                    placeholder="Enter Name"
                    className="form-control"
                    onChange={handleChange}
                    value={user?.fname}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-fields mb-3">
                  <label htmlFor="" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile"
                    className="form-control"
                    onChange={handleChange}
                    value={user?.mobile}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form-fields mb-3">
                  <label htmlFor="" className="form-label">
                    Reseller
                  </label>
                  <select
                    className="form-select"
                    onChange={handleChange}
                    value={user?.reseller}
                    name="reseller"
                    id=""
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div className="col-12">
                <div className="form-fields mb-3">
                  <label htmlFor="" className="form-label">
                    Balance
                  </label>
                  <input
                    type="text"
                    name="balance"
                    placeholder="Enter balance"
                    className="form-control"
                    onChange={handleChange}
                    value={user?.balance}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="register-btn bg-dark text-white"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditUser;
