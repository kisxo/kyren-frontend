import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import "./SideMenu.css";
import { message } from "antd";
import IMAGES from "../../img/image";
import { Dashboard, Login, Logout, SupportAgent, WorkspacePremium, Person, ShoppingBag } from "@mui/icons-material";
import { clearUser } from "../../redux/features/userSlice";

const SideMenu = ({ sideMenu, setSideMenu }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [submenu, setSubmenu] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUser());
    message.success("Logout Successful");
    navigate("/login");
  };
  return (
    <div className={`sidemenu-container d-block ${  sideMenu ? "active" : "" }`} >
      <div className="sidemenu">
        <HighlightOffIcon onClick={() => setSideMenu(!sideMenu)} className="close-icon" />
        <ul className="p-0">
          <>
            {/* <li>
              <Link onClick={() => setSideMenu(!sideMenu)} to="/games">
                Games
              </Link>
            </li> */}
            <li>
              <Link onClick={() => setSideMenu(!sideMenu)} to="/leaderboard">
                <WorkspacePremium/> Leaderboard
              </Link>
            </li>
            <li>
              <Link onClick={() => setSideMenu(!sideMenu)} to="/Support">
                <SupportAgent/> Support
              </Link>
            </li>
          </>
          {user && (
            <>
              <li>
                <Link to="/user-dashboard"><Dashboard/> Dashboard</Link>
              </li>
              <li>
                <Link to="/orders"><ShoppingBag/> My Orders</Link>
              </li>
              <li>
                <Link to="/my-account"> <Person/> My Account</Link>
              </li>
            </>
          )}
          {!user && (
            <div className="sidemenu-action-btn">
              <Link onClick={() => setSideMenu(!sideMenu)} to="/login">
                <Login/> Login
              </Link>
            </div>
          )}
          {user && (
            <div className="logout" onClick={handleLogout}>
              <Logout/> Logout
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
