import React from "react";
import { Link } from "react-router";
// import "./AdminSidebar.css";

import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Image,
    Users,
    CreditCard,
    Wallet,
} from "lucide-react";

const navlist = [
    { link: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { link: "/admin-orders", label: "Orders", icon: ShoppingBag },
    { link: "/admin-products", label: "Products", icon: Package },
    // { link: "/admin-products", label: "Products", icon: Package },
    // { link: "/admin-products", label: "Products", icon: Package },
    { link: "/admin-add-banner", label: "Banner", icon: Image },
    { link: "/admin-users", label: "Users", icon: Users },
    { link: "/admin-payments", label: "Payments", icon: CreditCard },
    // { link: "/admin-accounts", label: "Accounts", icon: Wallet },
];

const AdminSidebar = () => {
    return (
        <div className="space-y-6 text-sm">
            {navlist.map((nav, i) => (
                <Link to={nav.link} key={i} className="flex gap-2">
                    <nav.icon className="h-5 w-5" />
                    <span>{nav.label}</span>
                </Link>
            ))}
        </div>
    );

};

export default AdminSidebar;
