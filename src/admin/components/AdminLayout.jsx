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

            <div className="admin-body">
                <div className="admin-sidebar hidden lg:block">
                    <AdminSidebar />
                </div>

                {sidebarState && (
                    <div className="admin-sidebar lg:hidden">
                        <AdminSidebar />
                    </div>
                )}

                <div className="admin-body-content">{children}</div>
            </div>

            <footer>
                <div className="admin-footer">
                    <span>ADMIN</span>
                    {/* <span>~aashirdigital</span> */}
                </div>
            </footer>
        </div>
    );
};

export default AdminLayout;
