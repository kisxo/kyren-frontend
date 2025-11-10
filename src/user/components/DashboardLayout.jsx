import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import getUserData from "../../utils/userDataService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/login");
    dispatch(setUser(null));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-menu">
        <h4 className="text-white">Menu</h4>
        <ul>
          <li
            className={`${location.pathname === "/user-dashboard" && "active"}`}
          >
            <Link to="/user-dashboard">Dashboard</Link>
          </li>
          <li className={`${location.pathname === "/orders" && "active"}`}>
            <Link to="/orders">Orders</Link>
          </li>

          <li className={`${location.pathname === "/" && "active"}`}>
            <Link to="/">Recharge</Link>
          </li>
          <li className={`${location.pathname === "/my-account" && "active"}`}>
            <Link to="/my-account">Account</Link>
          </li>
          <li
            className="text-white"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            {/* <LogoutIcon className="me-2" /> */}
            Logout
          </li>
        </ul>
      </div>
      <div className="dashboard-content">{children}</div>
    </div>
  );
};

export default DashboardLayout;
