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
import { LuGamepad2 } from "react-icons/lu";
import { Wallet, User, Plus } from "lucide-react";

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
                <div
                    className="logo flex align-middle items-center"
                    onClick={() => navigate("/")}
                >
                    <img src={logo} className="size-10" alt="" />
                    <span className="font-bold">Kyren Official Store</span>
                    <LuGamepad2 />
                </div>

                {user ? (
                    // <div
                    //     className="wallet"
                    //     onClick={() => setSideMenu(!sideMenu)}
                    // >
                    //     hi
                    // </div>

                    <div className="flex ms-auto items-center gap-3">
                        {/* Wallet Section */}
                        <div className="flex items-center gap-2 bg-neutral-800/70 pe-2 rounded-full backdrop-blur-sm border border-neutral-700 shadow-sm hover:bg-neutral-700/70 transition">
                            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 transition text-white">
                                <Plus size={18} />
                            </button>

                            <div className="flex items-center gap-2 text-white">
                                <Wallet size={20} className="opacity-80" />
                                <span className="font-medium text-sm">
                                    {balance || 0}
                                </span>
                            </div>
                        </div>

                        {/* User Icon */}
                        <Link
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition text-white shadow-sm"
                            to="/user-dashboard"
                        >
                            <User size={20} />
                        </Link>
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
