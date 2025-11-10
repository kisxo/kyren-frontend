import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import CryptoJS from "crypto-js";
import { message } from "antd";
import "./Register.css";
import { AppUrl } from "../utils/appData";
import { IoPersonOutline } from "react-icons/io5";
import { IoPhonePortraitOutline } from "react-icons/io5";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [tab, setTab] = useState(0);
    const [otp, setOtp] = useState(null);
    const [userEnteredOtp, setUserEnteredOtp] = useState("");
    //EMAIL
    const [emailOtp, setEmailOtp] = useState(null);
    const [userEnteredEmailOtp, setUserEnteredEmailOtp] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            const res = await axios.post(
                AppUrl + "/api/user/send-mobile-otp",
                form
            );
            if (res.data.success) {
                setTab(1);
                const {
                    otp: encryptedOTP,
                    key: encryptedKey,
                    iv: encryptedIv,
                } = res.data.data;

                const key = CryptoJS.enc.Hex.parse(encryptedKey);
                const iv = CryptoJS.enc.Hex.parse(encryptedIv);

                // MOBILE OTP
                const decryptedOTP = CryptoJS.AES.decrypt(
                    { ciphertext: CryptoJS.enc.Hex.parse(encryptedOTP) },
                    key,
                    { iv: iv }
                ).toString(CryptoJS.enc.Utf8);
                setOtp(decryptedOTP);

                // EMAIL OTP
                // const decryptedEmailOTP = CryptoJS.AES.decrypt(
                //   { ciphertext: CryptoJS.enc.Hex.parse(encryptedEmailOTP) },
                //   key,
                //   { iv: iv }
                // ).toString(CryptoJS.enc.Utf8);
                // setEmailOtp(decryptedEmailOTP);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function handleRegister(e) {
        e.preventDefault();

        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form?.email)) {
            message.error("Invalid email format");
            return;
        }
        if (form?.mobile?.length > 10 || form?.mobile?.length < 10) {
            return message.error("Enter 10 digits Mobile Number only");
        }

        try {
            const res = await axios.post(AppUrl + "/api/user/register", form);
            if (res.data.success) {
                message.success(res.data.message);
                navigate("/login");
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login-container">
            <div
                className="back-btn flex items-center"
                onClick={() => navigate("/")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none" />
                    <line
                        x1="216"
                        y1="128"
                        x2="40"
                        y2="128"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="10"
                    />
                    <polyline
                        points="112 56 40 128 112 200"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="10"
                    />
                </svg>
                Back
            </div>
            <form className="login-form" onSubmit={handleRegister}>
                <div className="login-text">
                    <h2>Create a Account</h2>
                    <h3> For best deals</h3>
                </div>
                <div className="login-input mt-3">
                    <IoPersonOutline/>
                    <input
                        onChange={handleChange}
                        value={form?.fname}
                        name="fname"
                        type="text"
                        placeholder="Full Name"
                    />
                </div>

                <div className="login-input">
                    <IoPhonePortraitOutline/>
                    <input
                        onChange={handleChange}
                        value={form?.mobile}
                        name="mobile"
                        type="text"
                        className="form-control"
                        placeholder="Mobile"
                    />
                </div>

                <div className="login-input">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                    >
                        <rect width="256" height="256" fill="none" />
                        <path
                            d="M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56A0,0,0,0,1,32,56Z"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="10"
                        />
                        <polyline
                            points="224 56 128 144 32 56"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="10"
                        />
                    </svg>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={form?.email}
                        name="email"
                    />
                </div>

                <div className="login-input">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                    >
                        <rect width="256" height="256" fill="none" />
                        <circle
                            cx="128"
                            cy="140"
                            r="20"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="10"
                        />
                        <line
                            x1="128"
                            y1="160"
                            x2="128"
                            y2="184"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="16"
                        />
                        <rect
                            x="40"
                            y="88"
                            width="176"
                            height="128"
                            rx="8"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="16"
                        />
                        <path
                            d="M88,88V56a40,40,0,0,1,80,0V88"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="10"
                        />
                    </svg>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={form?.password}
                        name="password"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-md text-xs p-3"
                >
                    Register
                </button>

                <div className="quick-actions">
                    <Link to="/login">Login</Link>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </form>
            <div className="auth-footer">
                <Link target="_blank" to="https://wa.me/916003251677">
                    Contact Us
                </Link>
                <Link to="/terms">Terms & Conditions</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/refund-policy">Refund Policy</Link>
                <p>Copyright © 2023 Kyren Store</p>
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="container-fluid register-container hero-container">
                <div className="row text-center">
                    <div className="d-block m-auto col-12 col-sm-12 col-md-6 col-lg-6">
                        {tab === 0 && (
                            <form className="register-form">
                                <h1>Create Account</h1>
                                <div className="form-fields mb-3">
                                    <input
                                        onChange={handleChange}
                                        value={form?.fname}
                                        name="fname"
                                        type="text"
                                        className="form-control"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="form-fields mb-3">
                                    <input
                                        onChange={handleChange}
                                        value={form?.email}
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-fields mb-3">
                                    <input
                                        onChange={handleChange}
                                        value={form?.mobile}
                                        name="mobile"
                                        type="text"
                                        className="form-control"
                                        placeholder="Mobile"
                                    />
                                </div>
                                <div className="form-fields mb-3">
                                    <input
                                        onChange={handleChange}
                                        value={form?.password}
                                        name="password"
                                        type="text"
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>
                                <button
                                    className="bg-amber-400"
                                    onClick={handleRegister}
                                >
                                    Create Now
                                </button>
                                <div className="forgot-pass d-flex justify-content-between">
                                    <h6 className="text-center my-2">
                                        Already a Customer?{" "}
                                        <Link to="/login">Click here</Link>
                                    </h6>
                                </div>
                            </form>
                        )}
                        {tab === 1 && (
                            <form className="register-form">
                                <h1>Verification</h1>
                                <div className="form-fields mb-3">
                                    <label className="form-label text-start text-white d-block">
                                        Enter Mobile OTP
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setUserEnteredOtp(e.target.value)
                                        }
                                        value={userEnteredOtp}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter 4 digits Mobile OTP"
                                    />
                                </div>
                                {/* <div className="form-fields mb-3">
                  <label className="form-label text-start text-white d-block">
                    Enter Email OTP
                  </label>
                  <input
                    onChange={(e) => setUserEnteredEmailOtp(e.target.value)}
                    value={userEnteredEmailOtp}
                    type="text"
                    className="form-control"
                    placeholder="Enter 6 digits Email OTP"
                  />
                </div> */}
                                <button
                                    className="register-btn"
                                    onClick={handleRegister}
                                >
                                    Verify And Register
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
