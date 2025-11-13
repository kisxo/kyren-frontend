import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import DashboardLayout from "./components/DashboardLayout";
import axios from "axios";
import { useParams } from "react-router";
import { message } from "antd";
import { AppUrl } from "../utils/appData";

const ViewOrder = () => {
    const params = useParams();
    const [singleOrder, setSingleOrder] = useState(null);

    const getOrderById = async () => {
        try {
            const res = await axios.post(
                AppUrl + "/api/order/get-order-by-id",
                { orderId: params?.orderId },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (res.data.success) {
                setSingleOrder(res.data.data);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrderById();
    }, []);

    return (
        <Layout>
            <DashboardLayout>
                <div className="p-6 shadow-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-semibold tracking-wide">
                            Order Details
                        </h3>
                        <p className="text-sm text-gray-400 mt-2">
                            Order{" "}
                            <span className="font-semibold text-indigo-400">
                                #{singleOrder?.orderId}
                            </span>{" "}
                            was placed on{" "}
                            {singleOrder?.createdAt
                                ? new Date(
                                      singleOrder.createdAt
                                  ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                  })
                                : ""}{" "}
                            and is currently{" "}
                            <span
                                className={`${
                                    singleOrder?.status === "pending"
                                        ? "text-yellow-400"
                                        : "text-green-400"
                                } font-medium`}
                            >
                                {singleOrder?.status}
                            </span>
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-700 bg-neutral-900/60 backdrop-blur-sm">
                        <table className="w-full text-sm text-gray-300">
                            <thead className="bg-neutral-800/80 text-gray-400 uppercase text-xs">
                                <tr>
                                    <th className="py-3 px-4 text-left font-medium">
                                        Product
                                    </th>
                                    <th className="py-3 px-4 text-left font-medium">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                <tr>
                                    <td className="py-3 px-4">Order ID</td>
                                    <td className="py-3 px-4 font-medium text-gray-100">
                                        {singleOrder?.orderId}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4">
                                        {singleOrder?.productinfo}
                                    </td>
                                    <td className="py-3 px-4 text-indigo-300 font-semibold">
                                        ₹{singleOrder?.amount}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4">Status</td>
                                    <td
                                        className={`py-3 px-4 font-medium ${
                                            singleOrder?.status === "pending"
                                                ? "text-yellow-400"
                                                : "text-green-400"
                                        }`}
                                    >
                                        {singleOrder?.status}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4">Order Details</td>
                                    <td className="py-3 px-4 text-gray-200">
                                        {singleOrder?.orderDetails || "—"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4">
                                        Player ID / User ID
                                    </td>
                                    <td className="py-3 px-4">
                                        {singleOrder?.userId || "—"}
                                    </td>
                                </tr>
                                {singleOrder?.zoneId && (
                                    <tr>
                                        <td className="py-3 px-4">Zone ID</td>
                                        <td className="py-3 px-4">
                                            {singleOrder?.zoneId}
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td className="py-3 px-4">Date</td>
                                    <td className="py-3 px-4">
                                        {singleOrder?.createdAt
                                            ? new Date(
                                                  singleOrder.createdAt
                                              ).toLocaleString("en-US", {
                                                  day: "numeric",
                                                  month: "long",
                                                  year: "numeric",
                                                  hour: "numeric",
                                                  minute: "numeric",
                                                  second: "numeric",
                                              })
                                            : ""}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 text-center text-xs text-gray-500">
                        <p className="italic">
                            Thank you for your order! For any support, contact
                            our team.
                        </p>
                    </div>
                </div>
            </DashboardLayout>
        </Layout>
    );
};

export default ViewOrder;
