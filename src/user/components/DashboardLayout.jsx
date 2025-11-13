import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import getUserData from "../../utils/userDataService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { LayoutDashboard, ShoppingBag, Home, User, LogOut } from "lucide-react";

const DashboardLayout = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const menuItems = [
    { name: "Dashboard", path: "/user-dashboard", icon: <LayoutDashboard className="size-5" /> },
    { name: "Orders", path: "/orders", icon: <ShoppingBag className="size-5" /> },
    { name: "Recharge", path: "/", icon: <Home className="size-5" /> },
    { name: "Account", path: "/my-account", icon: <User className="size-5" /> },
  ];

    const handleLogout = () => {
        localStorage.clear("token");
        navigate("/login");
        dispatch(setUser(null));
    };

    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800">
        <span className="text-base font-medium tracking-wide">
          Hello, <b className="text-white/90">User</b>
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-neutral-800 text-white shadow-sm"
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:bg-neutral-900 hover:text-red-400 transition-all duration-200"
            >
              <LogOut className="size-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-neutral-950 border-t border-neutral-900">
        {props.children}
      </div>
    </div>
    );
};

export default DashboardLayout;
