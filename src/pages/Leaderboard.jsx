import Layout from "../components/Layout/Layout";
import axios from "axios";
import { AppUrl } from "../utils/appData";
import { useEffect, useState } from "react";
import { message } from "antd";
import "./Leaderboard.css";
import { KeyboardDoubleArrowRight, ArrowBack } from "@mui/icons-material";
import { Link } from "react-router";

const Leaderboard = () => {
    const [topBuyers, setTopBuyers] = useState();
    // 0 means current month
    const [currentMonth, setCurrentMonth] = useState(true);

    const getTopBuyers = async (year = "", month = "") => {
        try {
            const res = await axios.get(
                AppUrl + `/api/stats/leaderboard?year=${year}&month=${month}`
            );

            if (res.data.success) {
                setTopBuyers(res.data.data);
                console.log(topBuyers);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (currentMonth) {
            getTopBuyers();
        } else {
            getTopBuyers(2025, 4);
        }
    }, [currentMonth]);

    return (
        <Layout>
            <div className="leaderboard">
                <Link to={"/"} className="mb-4 d-block text-light">
                    <ArrowBack /> Back
                </Link>
                <div className="month-tab">
                    <div
                        className={
                            currentMonth
                                ? "current-month active-tab"
                                : "current-month"
                        }
                        onClick={() => {
                            setCurrentMonth(true);
                        }}
                    >
                        Current Month
                    </div>
                    <div
                        className={
                            !currentMonth
                                ? "last-month active-tab"
                                : "last-month"
                        }
                        onClick={() => {
                            setCurrentMonth(false);
                        }}
                    >
                        Last Month
                    </div>
                </div>
                <table className="table table-bordered border-gray">
                    <thead>
                        <tr>
                            <th scope="col">RANK</th>
                            <th scope="col">USER</th>
                            <th scope="col">NO</th>
                            <th scope="col">AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 26 }, (_, i) => (
                            <tr>
                                {topBuyers && topBuyers[i] && (
                                    <>
                                        <td> {i + 1} </td>
                                        <td> {topBuyers[i].fname} </td>
                                        <td> {topBuyers[i].totalOrders} </td>
                                        <td className="total-amount">
                                            {" "}
                                            {topBuyers[i].totalAmount}{" "}
                                            <KeyboardDoubleArrowRight />{" "}
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Leaderboard;
