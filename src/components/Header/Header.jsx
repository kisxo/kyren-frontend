import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import "./Header.css";
import SideMenu from "./SideMenu.jsx";
import Backdrop from "./Backdrop.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/userSlice.js";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Tippy from "@tippyjs/react";
import LogoutTippy from "./LogoutTippy.jsx";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SearchContainer from "../SearchContainer.jsx";
import IMAGES from "../../img/image.js";
import getUserData from "../../utils/userDataService.js";
import { LockOpen, ArrowRight } from "@mui/icons-material";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sideMenu, setSideMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    getUserData(dispatch, setUser, setBalance);
  }, []);

  return (
    <header className="header">
      <div className="header-main">
          <div className="logo" onClick={() => navigate("/")}>
            <svg className="logo-icon" width="250" height="157" viewBox="0 0 250 157" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.206455 30.3678L25.1625 119.631H224.811L249.767 30.3678C251.264 24.8464 245.275 20.7053 239.784 23.4661L179.89 57.975C176.396 59.8154 172.902 59.3553 169.907 55.6744L129.978 2.76071C126.983 -0.920238 122.99 -0.920238 119.995 2.76071L80.0658 55.6744C77.0711 59.3553 73.5772 59.8154 70.0834 57.975L10.1889 23.4661C5.69679 20.7053 -1.29091 24.8464 0.206455 30.3678Z" fill="#FF0000"/>
              <path d="M224.811 133.993H25.1625L22.6669 147.796C22.1678 152.398 25.1625 156.999 30.1537 156.999H219.82C224.411 157.091 227.806 152.398 227.306 147.796L224.811 133.993Z" fill="#FF0000"/>
            </svg>
            <div className="name">
              <span>Kyren Official </span> Store
            </div>
          </div>

          {user ? ( 
            <div className="wallet" onClick={() => setSideMenu(!sideMenu)}>
              <svg viewBox="0 0 1024 1024" className="icon" fill="#000000"> <g id="SVGRepo_iconCarrier"><path d="M732.1 399.3C534.6 356 696.5 82.1 425.9 104.8s-527.2 645.8-46.8 791.7 728-415 353-497.2z" fill="#464BD8"></path><path d="M276.8 449.8c0 37 30 66.9 66.9 66.9h319c9.6 0 17.4 7.8 17.4 17.4v234.7c0 9.6-7.8 17.4-17.4 17.4H389.3c-62.2 0-112.5-50.4-112.5-112.5V442.3" fill="#FFFFFF"></path><path d="M662.8 795.5H389.3c-67.2 0-121.8-54.6-121.8-121.8V442.3c0-5.1 4.1-9.3 9.3-9.3s9.3 4.1 9.3 9.3v7.6c0 31.8 25.9 57.7 57.7 57.7h319c14.7 0 26.6 12 26.6 26.6v234.7c0 14.6-11.9 26.6-26.6 26.6zM286.1 499.6v174.1c0 57 46.3 103.3 103.3 103.3h273.4c4.5 0 8.1-3.6 8.1-8.1V534.2c0-4.5-3.6-8.1-8.1-8.1h-319a76.2 76.2 0 0 1-57.7-26.5z" fill="#151B28"></path><path d="M662.8 795.5H389.3c-67.2 0-121.8-54.6-121.8-121.8V447.1c0-40.6 33.1-73.7 73.7-73.7h319.7c5.1 0 9.3 4.1 9.3 9.3s-4.1 9.3-9.3 9.3H341.2c-30.4 0-55.2 24.8-55.2 55.2v2.7c0 31.8 25.9 57.7 57.7 57.7h319c14.7 0 26.6 12 26.6 26.6v234.7a26.5 26.5 0 0 1-26.5 26.6zM286.1 499.6v174.1c0 57 46.3 103.3 103.3 103.3h273.4c4.5 0 8.1-3.6 8.1-8.1V534.2c0-4.5-3.6-8.1-8.1-8.1h-319a76.2 76.2 0 0 1-57.7-26.5z" fill="#151B28"></path><path d="M589.3 517H384.7V320.3c0-10.2 8.3-18.4 18.4-18.4h167.7c10.2 0 18.4 8.3 18.4 18.4V517z" fill="#2AEFC8"></path><path d="M589.3 525.5H384.7a8.5 8.5 0 0 1-8.5-8.5V320.3c0-14.8 12.1-26.9 26.9-26.9h167.7c14.8 0 26.9 12.1 26.9 26.9V517c0.1 4.7-3.7 8.5-8.4 8.5z m-196.1-17h187.7V320.3c0-5.5-4.5-10-10-10H403.1c-5.5 0-10 4.5-10 10v188.2z" fill="#151B28"></path><path d="M422.2 307.7h44.9V511h-44.9z" fill="#FFFFFF"></path><path d="M467.1 515.7h-44.9a4.8 4.8 0 0 1-4.8-4.8V307.7c0-2.6 2.1-4.8 4.8-4.8h44.9c2.6 0 4.8 2.1 4.8 4.8V511c0 2.6-2.2 4.7-4.8 4.7z m-40.1-9.5h35.4V312.4H427v193.8z m74.6-178h15.5v42.5h-15.5zM501.6 386.1h15.5v104.5h-15.5zM542.2 328.2h15.5v162.4h-15.5z" fill="#151B28"></path><path d="M694.1 588.8H521.5c-25.7 0-48.6 18.8-51 44.3-2.8 29.3 20.2 54 48.9 54h174.7c5.8 0 10.4-4.7 10.4-10.4v-77.5c0-5.7-4.6-10.4-10.4-10.4z" fill="#464BD8"></path><path d="M694.1 696.1H519.4c-16.3 0-32-6.9-43-19a58.23 58.23 0 0 1-14.8-44.8c2.8-29.4 29.1-52.4 60-52.4h172.6c10.7 0 19.4 8.7 19.4 19.4v77.5c-0.1 10.6-8.8 19.3-19.5 19.3z m-172.6-98.3c-21.7 0-40.2 15.9-42.1 36.2a39.63 39.63 0 0 0 10.3 31 40.3 40.3 0 0 0 29.8 13.2h174.7c0.8 0 1.5-0.7 1.5-1.5v-77.5c0-0.8-0.7-1.5-1.5-1.5l-172.7 0.1z" fill="#151B28"></path><path d="M523.3 638m-22.8 0a22.8 22.8 0 1 0 45.6 0 22.8 22.8 0 1 0-45.6 0Z" fill="#FFFFFF"></path></g></svg>
              <span className="balance">36.56</span>
              <ArrowRight className="arrow"/>
            </div>
          ): (
            <Link className="login-btn text-white" to="/login">Login</Link>
          )}

          {/* <div className="burger-icon d-block d-lg-none" onClick={() => setSideMenu(!sideMenu)}>
            <MenuIcon className="icon" />
          </div> */}
          
          <SideMenu  sideMenu={sideMenu} setSideMenu={setSideMenu} />
          <Backdrop sideMenu={sideMenu} setSideMenu={setSideMenu} />
      </div>
    </header>
  )

  return (
      <header className="header">
        <div className="header-main">
          <div className="logo" onClick={() => navigate("/")}>
            <span>
              <svg className="logo-icon" width="250" height="157" viewBox="0 0 250 157" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.206455 30.3678L25.1625 119.631H224.811L249.767 30.3678C251.264 24.8464 245.275 20.7053 239.784 23.4661L179.89 57.975C176.396 59.8154 172.902 59.3553 169.907 55.6744L129.978 2.76071C126.983 -0.920238 122.99 -0.920238 119.995 2.76071L80.0658 55.6744C77.0711 59.3553 73.5772 59.8154 70.0834 57.975L10.1889 23.4661C5.69679 20.7053 -1.29091 24.8464 0.206455 30.3678Z" fill="#FF0000"/>
              <path d="M224.811 133.993H25.1625L22.6669 147.796C22.1678 152.398 25.1625 156.999 30.1537 156.999H219.82C224.411 157.091 227.806 152.398 227.306 147.796L224.811 133.993Z" fill="#FF0000"/>
              </svg>
              <span className="blue">Kyren Official </span>Store</span>
              
          </div>
          
          <div className="menus d-none d-md-none d-lg-block mx-auto">
            <ul className="p-0">
            <li>
              <Link onClick={() => setSideMenu(!sideMenu)} to="/leaderboard">
                Leaderboard
              </Link>
            </li>
            <li>
              <Link onClick={() => setSideMenu(!sideMenu)} to="/Support">
                Support
              </Link>
            </li>
              {!user && (
                <li>
                  <Link to="/user-dashboard">My Account</Link>
                </li>
              )}
              {user && (
                <>
                  <li>
                    <Link to="/user-dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/my-account">My Account</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="ms-auto action-btns">
            {/* <SearchIcon onClick={() => setSearch(!search)} className="icon" /> */}
            <Tippy
              interactive
              theme="light"
              content={<LogoutTippy user={user && user} />}
            >
              <span className="menu-img-container d-flex">
                {user ? (
                  <>
                    <PersonIcon
                      className="icon"
                      onClick={() => navigate("/user-dashboard")}
                    />
                    <KeyboardArrowDownIcon className="d-lg-block d-md-none d-none text-white" />
                  </>
                ) : (
                  <></>
                  // <span className="bg-light me-2 b px-2 rounded-5" onClick={() => navigate("/login")}> SignIn </span>
                )}
              </span>
            </Tippy>
          </div>
          
          <div className="logo" onClick={() => navigate("/wallet")}>
            <svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M732.1 399.3C534.6 356 696.5 82.1 425.9 104.8s-527.2 645.8-46.8 791.7 728-415 353-497.2z" fill="#464BD8"></path><path d="M276.8 449.8c0 37 30 66.9 66.9 66.9h319c9.6 0 17.4 7.8 17.4 17.4v234.7c0 9.6-7.8 17.4-17.4 17.4H389.3c-62.2 0-112.5-50.4-112.5-112.5V442.3" fill="#FFFFFF"></path><path d="M662.8 795.5H389.3c-67.2 0-121.8-54.6-121.8-121.8V442.3c0-5.1 4.1-9.3 9.3-9.3s9.3 4.1 9.3 9.3v7.6c0 31.8 25.9 57.7 57.7 57.7h319c14.7 0 26.6 12 26.6 26.6v234.7c0 14.6-11.9 26.6-26.6 26.6zM286.1 499.6v174.1c0 57 46.3 103.3 103.3 103.3h273.4c4.5 0 8.1-3.6 8.1-8.1V534.2c0-4.5-3.6-8.1-8.1-8.1h-319a76.2 76.2 0 0 1-57.7-26.5z" fill="#151B28"></path><path d="M662.8 795.5H389.3c-67.2 0-121.8-54.6-121.8-121.8V447.1c0-40.6 33.1-73.7 73.7-73.7h319.7c5.1 0 9.3 4.1 9.3 9.3s-4.1 9.3-9.3 9.3H341.2c-30.4 0-55.2 24.8-55.2 55.2v2.7c0 31.8 25.9 57.7 57.7 57.7h319c14.7 0 26.6 12 26.6 26.6v234.7a26.5 26.5 0 0 1-26.5 26.6zM286.1 499.6v174.1c0 57 46.3 103.3 103.3 103.3h273.4c4.5 0 8.1-3.6 8.1-8.1V534.2c0-4.5-3.6-8.1-8.1-8.1h-319a76.2 76.2 0 0 1-57.7-26.5z" fill="#151B28"></path><path d="M589.3 517H384.7V320.3c0-10.2 8.3-18.4 18.4-18.4h167.7c10.2 0 18.4 8.3 18.4 18.4V517z" fill="#2AEFC8"></path><path d="M589.3 525.5H384.7a8.5 8.5 0 0 1-8.5-8.5V320.3c0-14.8 12.1-26.9 26.9-26.9h167.7c14.8 0 26.9 12.1 26.9 26.9V517c0.1 4.7-3.7 8.5-8.4 8.5z m-196.1-17h187.7V320.3c0-5.5-4.5-10-10-10H403.1c-5.5 0-10 4.5-10 10v188.2z" fill="#151B28"></path><path d="M422.2 307.7h44.9V511h-44.9z" fill="#FFFFFF"></path><path d="M467.1 515.7h-44.9a4.8 4.8 0 0 1-4.8-4.8V307.7c0-2.6 2.1-4.8 4.8-4.8h44.9c2.6 0 4.8 2.1 4.8 4.8V511c0 2.6-2.2 4.7-4.8 4.7z m-40.1-9.5h35.4V312.4H427v193.8z m74.6-178h15.5v42.5h-15.5zM501.6 386.1h15.5v104.5h-15.5zM542.2 328.2h15.5v162.4h-15.5z" fill="#151B28"></path><path d="M694.1 588.8H521.5c-25.7 0-48.6 18.8-51 44.3-2.8 29.3 20.2 54 48.9 54h174.7c5.8 0 10.4-4.7 10.4-10.4v-77.5c0-5.7-4.6-10.4-10.4-10.4z" fill="#464BD8"></path><path d="M694.1 696.1H519.4c-16.3 0-32-6.9-43-19a58.23 58.23 0 0 1-14.8-44.8c2.8-29.4 29.1-52.4 60-52.4h172.6c10.7 0 19.4 8.7 19.4 19.4v77.5c-0.1 10.6-8.8 19.3-19.5 19.3z m-172.6-98.3c-21.7 0-40.2 15.9-42.1 36.2a39.63 39.63 0 0 0 10.3 31 40.3 40.3 0 0 0 29.8 13.2h174.7c0.8 0 1.5-0.7 1.5-1.5v-77.5c0-0.8-0.7-1.5-1.5-1.5l-172.7 0.1z" fill="#151B28"></path><path d="M523.3 638m-22.8 0a22.8 22.8 0 1 0 45.6 0 22.8 22.8 0 1 0-45.6 0Z" fill="#FFFFFF"></path></g></svg>
          </div>

          <div className="burger-icon d-block d-lg-none" onClick={() => setSideMenu(!sideMenu)}>
            <MenuIcon className="icon" />
          </div>
          <SideMenu sideMenu={sideMenu} setSideMenu={setSideMenu} />
          <Backdrop sideMenu={sideMenu} setSideMenu={setSideMenu} />
        </div>
      </header>
  );
};

export default Header;
