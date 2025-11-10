import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { GoHomeFill } from "react-icons/go";

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
        <div className="fixed bottom-0 w-full bg-amber-400 p-2">
            <div><GoHomeFill className="size-10"/></div>
            {/* <WorkspacePremium /> */}
            {/* <Person /> */}
            {/* <FormatListBulletedIcon /> */}
            {/* {user ? (
                <Logout />
            ) : (
               <Login />
            )} */}
        </div>
    );
};

export default BottomNavBar;
