import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { GoHomeFill } from "react-icons/go";
import { MdWorkspacePremium } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { MdFormatListBulleted } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";

import { Link } from "react-router";

const BottomNavBar = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Map routes to indexes
    const pathToIndex = {
        "/": 0,
        "/leaderboard": 1,
        "/user-dashboard": 2,
        "/orders": 3,
        "/login": 4,
    };

    const indexToPath = [
        "/",
        "/leaderboard",
        "/user-dashboard",
        "/orders",
        "/login",
    ];
    const currentPath = location.pathname;
    const [value, setValue] = React.useState(pathToIndex[currentPath] || 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(indexToPath[newValue]);
    };

    const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    localStorage.clear();
    dispatch(clearUser());
    message.success("Logout Successful");

    // Redirect to login or home
    window.location.href = "/login"; // or "/"
    };

    const { pathname } = useLocation();
    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
            // eslint-disable-next-line
        }, [pathname]);

        return null;
    };
    ScrollToTop();

    return (
        <div className="fixed bottom-0 w-full bg-neutral-950/60 backdrop-blur-xs text-white/60 p-2 grid grid-cols-5 gap-6 text-xs">
            <Link to={"/"} className="flex flex-col items-center">
                <GoHomeFill className="size-6" />
                <span>Home</span>
            </Link>
            <Link to={"/leaderboard"} className="flex flex-col items-center">
                <MdWorkspacePremium className="size-6" />
                <span>Leaderboard</span>
            </Link>
            <Link to={"/user-dashboard"} className="flex flex-col items-center">
                <IoPersonSharp className="size-6" />
                <span>Profile</span>
            </Link>
            <Link to={"/orders"} className="flex flex-col items-center">
                <MdFormatListBulleted className="size-6" />
                <span>Orders</span>
            </Link>
            {user ? (
                <div onClick={handleLogout} className="flex flex-col items-center">
                    <MdLogout className="size-6" />
                    <span>Logout</span>
                </div>
            ) : (
                <Link to={"/login"} className="flex flex-col items-center">
                    <MdLogin className="size-6" />
                    <span>Login</span>
                </Link>
            )}
        </div>
    );
};

export default BottomNavBar;
