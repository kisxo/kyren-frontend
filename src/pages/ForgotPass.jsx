import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router";
// import "./Register.css";
import axios from "axios";
import { message } from "antd";
import { AppUrl } from "../utils/appData";

const ForgotPass = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [otp, setOtp] = useState(null);
    const [userEnteredOtp, setUserEnteredOtp] = useState(null);
    const [tab, setTab] = useState(0);
    const [pass, setPass] = useState(null);
    const [cpass, setCpass] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(AppUrl + "/api/user/send-otp", {
                email,
                msg: "We got your back! For password reset OTP is",
            });
            if (res.data.success) {
                message.success(res.data.message);
                setLoading(false);
                setTab(1);
                setMsg(true);
                setTimeout(() => {
                    setMsg(false);
                }, 59000);
            } else {
                message.error(res.data.message);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (userEnteredOtp === "") {
            return message.error("PLease enter otp");
        }
        if (!pass || !cpass) {
            return message.error("Please enter password");
        }
        if (pass !== cpass) {
            return message.error("Password doesnt match");
        }
        try {
            const res = await axios.post(AppUrl + "/api/user/verify-otp", {
                email,
                userEnteredOtp,
                pass,
            });
            if (res.data.success) {
                message.success(res.data.message);
                navigate("/login");
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="p-4 flex">
                <div className="mx-auto">
                    {tab === 0 && (
                        <div className="">
                            <h2 className="text-3xl font-bold">
                                Forgot Password
                            </h2>
                            <p className="text-sm text-neutral-400">
                                Dont worry! Get Otp on Your Email
                            </p>
                            <div className="space-x-4 py-4">
                                <label className="form-label" htmlFor="name">
                                    Email
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Email Registered with us"
                                    className="input"
                                    type="text"
                                    required
                                />
                            </div>
                            <button
                                className="btn w-full"
                                onClick={handleSendOtp}
                            >
                                {loading ? "Sending..." : "Send OTP"}
                            </button>
                            {msg && (
                                <p className="text-md">
                                    OTP is valid for 1 minute
                                </p>
                            )}
                        </div>
                    )}
                    {tab === 1 && (
                        <div className="space-y-4">
                            <h6 className="text-4xl">Reset Your Password</h6>
                            <hr />
                            <div className="">
                                <label className="form-label" htmlFor="name">
                                    Verify Your Otp
                                </label>
                                <input
                                    onChange={(e) =>
                                        setUserEnteredOtp(e.target.value)
                                    }
                                    placeholder="Enter Otp"
                                    className="input w-full"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="mb-3 form-fields">
                                <label className="form-label" htmlFor="name">
                                    Enter New Password
                                </label>
                                <input
                                    onChange={(e) => setPass(e.target.value)}
                                    className="input w-full"
                                    type="text"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            <div className="form-fields">
                                <label className="form-label" htmlFor="name">
                                    Confirm Password
                                </label>
                                <input
                                    onChange={(e) => setCpass(e.target.value)}
                                    className="input w-full"
                                    placeholder="Enter confirm password"
                                    type="text"
                                    required
                                />
                            </div>
                            <button className="btn w-full" onClick={handleVerifyOtp}>
                                Verify & Update
                            </button>
                        </div>
                    )}
                    <p className="text-sm text-neutral-400 py-4">
                        Not a User?{" "}
                        <Link className="text-neutral-200" to="/register">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPass;
