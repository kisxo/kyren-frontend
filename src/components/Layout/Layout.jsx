import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
// import "./Layout.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useDispatch, useSelector } from "react-redux";
import getUserData from "../../utils/userDataService.js";
import { clearUser } from "../../redux/features/userSlice.js";
import { message } from "antd";
import {
    Home,
    WorkspacePremium,
    Dashboard,
    Person,
    Login,
    Logout,
} from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

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
        <>
            <Header />
            <div className="body bg-amber-600 p-5">{children}</div>
            <Footer />
        </>
    );
    return (
        <Box>
            <List style={{ backgroundColor: "#666" }}>
                <Header />
                <div className="body bg-amber-600 p-5">{children}</div>
                <Footer />
            </List>
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavigation
                    style={{
                        color: "#FFFFFF",
                        borderTop: ".5px solid #777",
                        backdropFilter: "blur(10px)",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        WebkitBackdropFilter: "blur(10px)",
                    }}
                    showLabels
                    value={value}
                    onChange={handleChange}
                    sx={{
                        bgcolor: "none",
                        "& .MuiBottomNavigationAction-root": {
                            color: "#fff", // unselected color
                        },
                        "& .MuiBottomNavigationAction-root.Mui-selected": {
                            color: "#fff", // selected color
                            backgroundColor: "#f00",
                        },
                        "& .MuiBottomNavigationAction-label": {
                            color: "#fff", // label text
                            whiteSpace: "nowrap",
                        },
                        "& .MuiBottomNavigationAction-root.Mui-selected .MuiBottomNavigationAction-label":
                            {
                                color: "#fff", // selected label text
                            },
                    }}
                >
                    <BottomNavigationAction label="Home" icon={<Home />} />
                    <BottomNavigationAction
                        label="Leaderboard"
                        icon={<WorkspacePremium />}
                    />
                    <BottomNavigationAction label="Profile" icon={<Person />} />
                    <BottomNavigationAction
                        label="Orders"
                        icon={<FormatListBulletedIcon />}
                    />
                    {user ? (
                        <BottomNavigationAction
                            label="Logout"
                            icon={<Logout />}
                            onClick={handleLogout}
                        />
                    ) : (
                        <BottomNavigationAction
                            label="Login"
                            icon={<Login />}
                        />
                    )}
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default Layout;
