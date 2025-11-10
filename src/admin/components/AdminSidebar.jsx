import React from "react";
import { Link } from "react-router";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar-container">
      <span>
        <small>MAIN</small>
      </span>
      <ul>
        <li>
          <Link to="/admin-dashboard">
            {/* <HomeIcon className="me-2 icon" /> */}
            Dashboard
          </Link>
        </li>
      </ul>
      <span>
        <small>LISTS</small>
      </span>
      <ul>
        <li>
          <Link to="/admin-orders">
            {/* <ReceiptIcon className="me-2 icon" /> */}
            Orders
          </Link>
        </li>
        <li>
          <Link to="/admin-products">
            {/* <InventoryIcon className="me-2 icon" /> */}
            Products
          </Link>
        </li>
        <li>
          <Link to="/admin-users">
            {/* <GroupIcon className="me-2 icon" /> */}
            Customers
          </Link>
        </li>
        <li>
          <Link to="/admin-payments">
            {/* <PaymentIcon className="me-2 icon" /> */}
            Payments
          </Link>
        </li>
        <li>
          <Link to="/admin-accounts">
            {/* <ContactEmergency className="me-2 icon" /> */}
            Accounts
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
