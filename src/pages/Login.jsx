import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router";
import { message } from "antd";
import axios from "axios";
import "./Login.css";
import IMAGES from "../img/image";
import { AppUrl } from "../utils/appData";

const LoginOld = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(AppUrl + "/api/user/login", form);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        if (res.data.isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid hero-container register-container">
        <div className="row text-center">
          <div className="d-block m-auto col-12 col-sm-12 col-md-6 col-lg-6">
            <form className="register-form" onSubmit={handleSubmit}>
              <h1>Login</h1>
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
                  value={form?.password}
                  name="password"
                  type="text"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button className="register-btn">Login</button>
              <div className="forgot-pass d-flex justify-content-between">
                <h6 className="text-center my-2">
                  New Customer? <Link to="/register">Sign Up</Link>
                </h6>
                <h6 className="text-center my-2">
                  Forgot Password? <Link to="/forgot-password">Click Here</Link>
                </h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(AppUrl + "/api/user/login", form);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        if (res.data.isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="back-btn flex items-center" onClick={() => navigate("/")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/><polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/></svg>
        Back
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-text">
          <h2>Login To Account</h2>
          <h3> Login using Email and Password</h3>
        </div>
        <div className="login-input mt-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56A0,0,0,0,1,32,56Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/><polyline points="224 56 128 144 32 56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/></svg>
          <input type="email" placeholder="Email" onChange={handleChange} value={form?.email} name="email"/>
        </div>

        <div className="login-input">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="140" r="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/><line x1="128" y1="160" x2="128" y2="184" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="40" y="88" width="176" height="128" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M88,88V56a40,40,0,0,1,80,0V88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/></svg>
          <input type="password" placeholder="Password" onChange={handleChange} value={form?.password} name="password"/>
        </div>

        <button type="submit" className="login-btn">Login</button>

        
        <div className="quick-actions">
          <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

      </form>
      <div className="auth-footer">
        <Link target="_blank" to="https://wa.me/916003251677">Contact Us</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/refund-policy">Refund Policy</Link>
        <p>Copyright © 2023 Kyren Store</p>
      </div>
    </div>
  );
};

export default Login;
