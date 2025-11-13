import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import DashboardLayout from "./components/DashboardLayout";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";
import { AppUrl } from "../utils/appData";

const Account = () => {
  const { user } = useSelector((state) => state.user);
  const [form, setForm] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(AppUrl + "/api/user/user-profile-update", form);
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
        AppUrl + "/api/user/getUserData",
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
        <div className="p-6 shadow-lg text-gray-100">
          <h3 className="text-xl font-semibold mb-6 text-center text-white tracking-wide">
            Account Settings
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <div className="text-base font-medium text-gray-200 bg-gray-800/60 border border-gray-700 px-4 py-2 rounded-lg">
                {user?.email}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                New Password
              </label>
              <input
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                type="password"
                placeholder="Enter new password"
                className="w-full bg-gray-800/70 border border-gray-700 focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500 px-4 py-2 rounded-lg outline-none transition-all duration-200"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Update
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6 italic">
            Update your account details securely. Your data remains encrypted.
          </p>
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default Account;
