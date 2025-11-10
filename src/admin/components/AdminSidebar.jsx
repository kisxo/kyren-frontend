import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HelpIcon from "@mui/icons-material/Help";
import InventoryIcon from "@mui/icons-material/Inventory";
import DiscountIcon from "@mui/icons-material/Discount";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Link } from "react-router";
import "./AdminSidebar.css";
import { ContactEmergency } from "@mui/icons-material";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar-container">
      <span>
        <small>MAIN</small>
      </span>
      <ul>
        <li>
          <Link to="/admin-dashboard">
            <HomeIcon className="me-2 icon" />
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
            <ReceiptIcon className="me-2 icon" />
            Orders
          </Link>
        </li>
        <li>
          <Link to="/admin-products">
            <InventoryIcon className="me-2 icon" />
            Products
          </Link>
        </li>
        <li>
          <Link to="/admin-users">
            <GroupIcon className="me-2 icon" />
            Customers
          </Link>
        </li>
        <li>
          <Link to="/admin-payments">
            <PaymentIcon className="me-2 icon" />
            Payments
          </Link>
        </li>
        <li>
          <Link to="/admin-accounts">
            <ContactEmergency className="me-2 icon" />
            Accounts
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
