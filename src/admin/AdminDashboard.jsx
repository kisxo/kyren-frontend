import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import "./AdminDashboard.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { message } from "antd";
import { AppUrl } from "../utils/appData";

// ✅ NEW ICONS
import { ShoppingCart, Package, CreditCard } from "lucide-react";

const AdminDashboard = () => {


  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const getOrdersSum = async () => {
    try {
      setLoading(true);
      const res = await axios.get(AppUrl + "/api/order/sum", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.success) {;
      setTotal(parseFloat(res.data.total));
      //   setData(res.data.data.reverse());
      //   setOrders(res.data.data.reverse());
      //   setTotal(res.data.total);
      //   const filteredOrders = selectedMonth
      //     ? res.data.data.filter((order) => {
      //         return (
      //           new Date(order.createdAt).getMonth() + 1 ===
      //           Number(selectedMonth)
      //         );
      //       })
      //     : res.data.data;

      //   const ordersData = filteredOrders.reverse();
      //   const userTotalAmounts = {};
      //   ordersData.forEach((order) => {
      //     const userEmail = order.email;
      //     const orderPrice = parseFloat(order.amount);
      //     if (!userTotalAmounts[userEmail]) {
      //       userTotalAmounts[userEmail] = 0;
      //     }
      //     userTotalAmounts[userEmail] += orderPrice;
      //   });

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getOrdersCount = async () => {
    try {
      setLoading(true);
      const res = await axios.get(AppUrl + "/api/stats/orders", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.orders) {
      setOrders(parseFloat(res.data.orders) - 40000);
      //   setData(res.data.data.reverse());
      //   setOrders(res.data.data.reverse());
      //   setTotal(res.data.total);
      //   const filteredOrders = selectedMonth
      //     ? res.data.data.filter((order) => {
      //         return (
      //           new Date(order.createdAt).getMonth() + 1 ===
      //           Number(selectedMonth)
      //         );
      //       })
      //     : res.data.data;

      //   const ordersData = filteredOrders.reverse();
      //   const userTotalAmounts = {};
      //   ordersData.forEach((order) => {
      //     const userEmail = order.email;
      //     const orderPrice = parseFloat(order.amount);
      //     if (!userTotalAmounts[userEmail]) {
      //       userTotalAmounts[userEmail] = 0;
      //     }
      //     userTotalAmounts[userEmail] += orderPrice;
      //   });

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // PRODUCTS
  const getAllProducts = async () => {
    try {
      const res = await axios.get(AppUrl + "/api/product/get-all-products");
      if (res.data.success) {
        setProducts(res.data.data.reverse());
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formattedTotal =
    total >= 1000
      ? total % 1000 === 0
        ? `${total / 1000}k`
        : `${(total / 1000).toFixed(1)}k`
      : total;

  const formattedOrder =
    orders >= 1000
      ? orders % 1000 === 0
        ? `${orders / 1000}k`
        : `${(orders / 1000).toFixed(1)}k`
      : orders;

  useEffect(() => {
    getOrdersSum();
    getAllProducts();
    getOrdersCount();
  }, [selectedMonth]);

    return (
        <AdminLayout title="Admin Dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {/* Orders */}
                <div
                    onClick={() => navigate("/admin-orders")}
                    className="flex items-center gap-4 bg-white border border-gray-200 p-5 rounded-xl shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition"
                >
                    <div className="bg-blue-100 p-3 rounded-xl">
                        <ShoppingCart className="w-7 h-7 text-blue-600" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold m-0">
                            {loading ? "..." : formattedOrder || 0}
                        </h1>
                        <span className="text-gray-600 text-sm">
                            Total Orders
                        </span>
                    </div>
                </div>

                {/* Products */}
                <div
                    onClick={() => navigate("/admin-products")}
                    className="flex items-center gap-4 bg-white border border-gray-200 p-5 rounded-xl shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition"
                >
                    <div className="bg-green-100 p-3 rounded-xl">
                        <Package className="w-7 h-7 text-green-600" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold m-0">
                            {loading ? "..." : products?.length || 0}
                        </h1>
                        <span className="text-gray-600 text-sm">
                            Total Products
                        </span>
                    </div>
                </div>

                {/* Sales */}
                <div
                    onClick={() => navigate("/admin-payments")}
                    className="flex items-center gap-4 bg-white border border-gray-200 p-5 rounded-xl shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition"
                >
                    <div className="bg-yellow-100 p-3 rounded-xl">
                        <CreditCard className="w-7 h-7 text-yellow-600" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold m-0">
                            {loading ? "..." : formattedTotal || 0}
                        </h1>
                        <span className="text-gray-600 text-sm">
                            Total Sales
                        </span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
