import React from "react";
import { Link, useNavigate } from "react-router";

const AdminSidemenu = ({ menu, setMenu }) => {
  const navigate = useNavigate();
  return (
    <div className={`admin-sidemenu-container ${menu && "active"}`}>
      <div className="w-100 d-flex justify-content-end p-3">
        <CancelIcon
          onClick={() => setMenu(!menu)}
          className="text-dark cancel-icon"
        />
      </div>
      <ul>
        <li
          onClick={() => {
            setMenu(!menu);
            navigate("/admin-dashboard");
          }}
        >
          <HomeIcon className="me-2" />
          Dashboard
        </li>
        <li
          onClick={() => {
            setMenu(!menu);
            navigate("/admin-orders");
          }}
        >
          <ReceiptIcon className="me-2" />
          Orders
        </li>
        <li
          onClick={() => {
            setMenu(!menu);
            navigate("/admin-payments");
          }}
        >
          <MobileScreenShareIcon className="me-2" />
          Payment
        </li>
        <li
          onClick={() => {
            setMenu(!menu);
            navigate("/admin-users");
          }}
        >
          <GroupIcon className="me-2" />
          Customers
        </li>
        <li
          onClick={() => {
            setMenu(!menu);
            navigate("/admin-products");
          }}
        >
          <InventoryIcon className="me-2" />
          Product
        </li>
      </ul>
    </div>
  );
};

export default AdminSidemenu;
