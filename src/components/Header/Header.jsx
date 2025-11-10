import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import "./Header.css";
import SideMenu from "./SideMenu.jsx";
import Backdrop from "./Backdrop.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/userSlice.js";
import axios from "axios";
import Tippy from "@tippyjs/react";
import LogoutTippy from "./LogoutTippy.jsx";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import SearchContainer from "../SearchContainer.jsx";
import getUserData from "../../utils/userDataService.js";
import logo from "./../../assets/logo.png";

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
        <div className="header bg-amber-100">
            <div className="header-main">
                <div className="logo flex align-middle items-center" onClick={() => navigate("/")}>
                    <img src={logo} className="size-10" alt="" />
                    <span className="font-bold">Kyren Official Store</span> 
                </div>

                {user ? (
                    <div
                        className="wallet"
                        onClick={() => setSideMenu(!sideMenu)}
                    >
                        hi
                    </div>
                ) : (
                    <Link className="login-btn text-white" to="/login">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
