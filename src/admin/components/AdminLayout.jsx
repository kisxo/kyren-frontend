import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";

const AdminLayout = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [sidebarState, setSidebarState] = useState(false);

    useEffect(() => {
        if (user) {
            if (user.isAdmin) {
            } else {
                navigate("/user-dashboard");
            }
        }
    }, [user]);

    function toggleSidebar (){setSidebarState(!sidebarState)}

    return (
        <div className="admin-layout-container bg-neutral-50">
           <div className="flex justify-between p-4 items-center bg-black text-white">
                <span>
                Hello! <b>ADMIN</b>
              </span>
              <RxHamburgerMenu onClick={toggleSidebar} className="size-8"/>
           </div>

            {sidebarState && (
                <div className="lg:hidden absolute bg-neutral-50/40 backdrop-blur-sm bg--500 w-full p-4">
                    <AdminSidebar />
                </div>
            )}

            <div className="flex h-screen">
                <div className="hidden lg:block w-50 p-4 border">
                    <AdminSidebar />
                </div>
                <div className="">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
