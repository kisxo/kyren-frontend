import React, { useState } from "react";
import "./AdminLayout.css";
import AdminSidemenu from "./AdminSidemenu";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(setUser(null));
  };
  return (
    <div className="admin-header-main">
      <span>
        Hello! <b>ADMIN</b>
      </span>
      <div className="admin-tools">
        {/* <SearchIcon /> */}
        {/* <NotificationsIcon /> */}
        {/* <LogoutIcon onClick={handleLogout} /> */}
        {/* <DragHandleIcon
          onClick={() => setMenu(!menu)}
          className="d-block d-md-block d-lg-none"
        /> */}
        {/* <AdminSidemenu menu={menu} setMenu={setMenu} /> */}
      </div>
    </div>
  );
};

export default AdminHeader;
