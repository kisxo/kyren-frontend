import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
// import "./Layout.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

import { useDispatch, useSelector } from "react-redux";
import getUserData from "../../utils/userDataService.js";
import { clearUser } from "../../redux/features/userSlice.js";
import { message } from "antd";

import BottomNavBar from "../BottomNavBar.jsx";

const Layout = ({ children }) => {
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
        localStorage.clear();
        dispatch(clearUser());
        message.success("Logout Successful");
        navigate("/login");
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
        <div className="h-screen flex flex-col">
            <Header/>
            <div className="grow">{children}</div>
            <Footer />
            <BottomNavBar/>
        </div>
    )
};

export default Layout;
