import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router";
import { message } from "antd";
import axios from "axios";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useDispatch, useSelector } from "react-redux";
import getUserData from "../utils/userDataService";
import { setUser } from "../redux/features/userSlice";
import "./ProductInfo.css";
import { ApiUrl } from "../utils/appData";
import ItemCard from "../components/ItemCard";
import { AppUrl } from "../utils/appData";
import mlbbHelpImage from "../img/help/mlbbHelp.png";

const ProductInfo = (props) => {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [checkLoading, setCheckLoading] = useState(false);
    const [playerCheck, setPlayerCheck] = useState(null);
    const [product, setProduct] = useState(0);
    const [showImage, setShowImage] = useState(0);
    const [error, setError] = useState(false);
    const [orderId, setOrderId] = useState(false);
    const [mode, setMode] = useState("UPI");

    //!NEW STATE
    const [playerId, setPlayerId] = useState("");
    const [amount, setAmount] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [productId, setProductId] = useState("");
    const [currentTab, setCurrentTab] = useState("all");
    //! API BASED
    const [userId, setUserId] = useState("");
    const [zoneId, setZoneId] = useState("");
    const [balance, setBalance] = useState("");
    const [loader, setLoader] = useState(false);
    const [orderProcess, setOrderProcess] = useState(false);

    useEffect(() => {
        let productExists = false;
        props.productsList.forEach((item) => {
            if (params.name === item.name) {
                productExists = true;
            }
        });

        if (!productExists) {
            navigate("/");
        }
    }, [props]);

    useEffect(() => {
        props.productsList.forEach((item) => {
            if (params.name === item.name) {
                setProduct(item);
                const defaultAmount = item?.cost?.[0]?.amount;
                const defaultPrice =
                    user && user?.reseller === "yes"
                        ? item?.cost?.[0]?.resPrice
                        : item?.cost?.[0]?.price;
                const defaultId = item?.cost?.[0]?.id;
                setAmount(defaultAmount);
                setSelectedPrice(defaultPrice);
                setProductId(defaultId);
                checkTabs(item.tabs);
            }
        });
    }, [params?.name, user]);

    useEffect(() => {
        getUserData(dispatch, setUser, setBalance);
    }, []);

    function setPriceAndId(amount) {
        if (user?.reseller === "yes") {
            const price = product?.cost?.find(
                (item) => item?.amount === amount
            )?.resPrice;
            setSelectedPrice(price);
        } else {
            const price = product?.cost?.find(
                (item) => item?.amount === amount
            )?.price;
            setSelectedPrice(price);
        }
        const id = product?.cost?.find((item) => item?.amount === amount)?.id;
        setProductId(id);
    }

    const getProduct = async () => {
        try {
            const res = await axios.post(
                ApiUrl + "/product/get-product-by-name",
                {
                    name: params.name,
                }
            );
            if (res.data.success) {
                setProduct(res.data.data);
                const defaultAmount = res.data.data?.cost?.[0]?.amount;
                const defaultPrice =
                    user && user?.reseller === "yes"
                        ? res.data.data?.cost?.[0]?.resPrice
                        : res.data.data?.cost?.[0]?.price;
                const defaultId = res.data.data?.cost?.[0]?.id;
                setAmount(defaultAmount);
                setSelectedPrice(defaultPrice);
                setProductId(defaultId);

                checkTabs(res.data.data.tabs);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    function checkTabs(tabs) {
        if (tabs.length > 1) {
            setCurrentTab(tabs[1].name);
        }
    }

    const generateOrderId = () => {
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2); // Last two digits of the year
        const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
        const day = now.getDate().toString().padStart(2, "0");
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const randomNum = Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
        const orderId = `${year}${month}${day}${hours}${minutes}${seconds}${randomNum}`;
        setOrderId(orderId);
    };

    useEffect(() => {
        getProduct();
    }, [params?.name, user]);

    useEffect(() => {
        generateOrderId();
    }, []);

    async function handleCheckPlayer() {
        if (userId === "" || zoneId === "") {
            return message.error(
                `${userId === "" ? "Enter user id" : "Enter zone id"}`
            );
        }
        try {
            setCheckLoading(true);
            const object = {
                userid: userId,
                zoneid: zoneId,
                apiName: product?.apiName,
            };
            const res = await axios.post( AppUrl + "/api/payment/get-role", object);
            if (res.data.success) {
                setPlayerCheck(res.data.username);
                setCheckLoading(false);
                setLoading(false);
            } else {
                message.error(res.data.message);
                setCheckLoading(false);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setCheckLoading(false);
            setLoading(false);
        }
    }

    function checkPlaceOrder(e) {
        if (product?.api === "no") {
            if (playerId === "") {
                return message.error("Some Fields are missing");
            }
        } else if (product?.apiName === "moogold") {
            // mlbb & genshin
            if (
                product?.gameName === "428075" ||
                product?.gameName === "15145" ||
                product?.gameName === "2362359" ||
                product?.gameName === "4690648" ||
                product?.gameName === "5846232" ||
                product?.gameName === "6637539" ||
                product?.gameName === "8957883" ||
                product?.gameName === "8996566" ||
                product?.gameName === "10874415"
            ) {
                if (userId === "") {
                    return message.error("Enter User ID");
                }
                if (zoneId === "") {
                    return message.error("Select Server");
                }
            }
            if (product?.gameName === "13465") {
                if (userId === "") {
                    return message.error("Enter User ID");
                }
            }
        } else {
            if (userId === "") {
                return message.error("Enter User ID");
            }
            if (zoneId === "") {
                return message.error("Enter Zone ID");
            }
            if (playerCheck === null) {
                return message.error("Check Your Player Name");
            }
        }

        if (product?.api === "yes") {
            if (product?.apiName === "smileOne") {
                if (mode === "UPI") {
                    handleSmileOneUpiOrder(e);
                } else {
                    handleSmileOneWalletOrder(e);
                }
            } else if (product?.apiName === "moogold") {
                if (mode === "UPI") {
                    handleMoogoldUpiOrder(e);
                } else {
                    handleMoogoldWalletOrder(e);
                }
            }
        }
    }

    const handleSmileOneUpiOrder = async (e) => {
        e.preventDefault();
        try {
            const paymentObject = {
                order_id: orderId,
                txn_amount: selectedPrice,
                product_name: product?.region,
                customer_name: user?.fname,
                customer_email: user?.email,
                customer_mobile: user?.mobile,
                callback_url: `https://wurustore.in/api/payment/check-api-upi-order?orderId=${orderId}`,
                txn_note:
                    userId +
                    "@" +
                    zoneId +
                    "@" +
                    productId +
                    "@" +
                    product?.name +
                    "@" +
                    amount,
            };

            setLoader(true);
            const response = await axios.post(
                "/api/payment/create-api-upi-order",
                paymentObject,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (response.data.success && response.data.data.status) {
                window.location.href = response.data.data.result.payment_url;
                setLoading(false);
                setLoader(false);
            } else {
                message.error(response.data.message);
                setLoading(false);
                setLoader(false);
            }
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    };
    const handleSmileOneWalletOrder = async (e) => {
        if (parseInt(balance) < parseInt(selectedPrice)) {
            return message.error("Balance is less for this order");
        }
        e.preventDefault();
        try {
            const orderObject = {
                orderId: orderId,
                userid: userId,
                zoneid: zoneId,
                productid: productId,
                region: product.region,
                customer_email: user?.email,
                customer_mobile: user?.mobile,
                pname: product?.name,
                amount: amount,
                price: selectedPrice,
            };
            setLoading(true);
            setLoader(true);
            const res = await axios.post(
                "/api/payment/place-order-from-wallet",
                orderObject,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (res.data.success) {
                message.success(res.data.message);
                navigate("/user-dashboard");
                setLoader(false);
                setLoading(false);
            } else {
                setLoading(false);
                setLoader(false);
                message.error(res.data.message);
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    async function handleMoogoldUpiOrder(e) {
        e.preventDefault();
        try {
            const paymentObject = {
                order_id: orderId,
                txn_amount: selectedPrice,
                product_name: product?.gameName,
                customer_name: user?.fname,
                customer_email: user?.email,
                customer_mobile: user?.mobile,
                callback_url: `https://wurustore.in/api/moogold/check-moogold-upi-order?orderId=${orderId}`,
                txn_note:
                    userId +
                    "@" +
                    zoneId +
                    "@" +
                    productId +
                    "@" +
                    product?.name +
                    "@" +
                    amount,
            };

            setLoader(true);
            const response = await axios.post(
                "/api/payment/create-api-upi-order",
                paymentObject,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (response.data.success && response.data.data.status) {
                window.location.href = response.data.data.result.payment_url;
                setLoading(false);
                setLoader(false);
            } else {
                message.error(response.data.message);
                setLoading(false);
                setLoader(false);
            }
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    }
    async function handleMoogoldWalletOrder(e) {
        if (parseInt(balance) < parseInt(selectedPrice)) {
            return message.error("Balance is less for this order");
        }
        e.preventDefault();
        try {
            const orderObject = {
                api: product?.api,
                order_id: orderId,
                txn_amount: selectedPrice,
                product_name: product?.gameName,
                customer_email: user?.email,
                customer_mobile: user?.mobile,
                txn_note:
                    userId +
                    "@" +
                    zoneId +
                    "@" +
                    productId +
                    "@" +
                    product?.name +
                    "@" +
                    amount,
            };

            setLoading(true);
            setLoader(true);
            const res = await axios.post(
                "/api/moogold/place-moogold-from-wallet",
                orderObject,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (res.data.success) {
                message.success(res.data.message);
                navigate("/user-dashboard");
                setLoading(false);
                setLoader(false);
            } else {
                setLoading(false);
                setLoader(false);
                message.error(res.data.message);
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    }
    const getBackgroundImage = () => {
        const name = product?.name?.toLowerCase();
        if (name === "genshin impact") {
            return 'url("https://www.gamerefinery.com/wp-content/uploads/2020/10/genshin-impact-header.jpg")';
        } else if (name === "pubg mobile(global)") {
            return 'url("https://esportsinsider.com/wp-content/uploads/2023/01/pubg-mobile-global-championship-viewership.jpg")';
        } else if (name === "honkai: star rail") {
            return 'url("https://cdn.wccftech.com/wp-content/uploads/2023/05/EPIC2560x1440-EN_2560x1440-e3a424594bad5b013ef4a19625f05146-1920x1080.jpeg")';
        } else if (name === "honor of kings") {
            return 'url("https://www.honorofkings.com/assets/m_det_img.e4a62201.jpg")';
        } else {
            return 'url("https://staticg.sportskeeda.com/editor/2023/07/fde0c-16888913542123-1920.jpg")';
        }
    };
    return (
        <Layout>
            <div className="product-page-wrapper">
              <div className="game-box mb-5">
                <div className="game-banner">
                  <div className="info">
                    <img src={`https://wurustore.in/${product?.image}`}/>
                    <div className="name">{product.name}</div>
                  </div>
                  <div className="instructions">
                    <div className="heading">EASY STEPS TO FOLLOW</div>
                    <div className="steps">
                      <div >1</div> 
                      Enter and validate your user ID & server.
                    </div>
                    <div className="steps">
                      <div>2</div>
                      Select your desired topup package.
                    </div>
                    <div className="steps">
                      <div>3</div>
                      Check your balance after successful payment.
                    </div>
                    <div className="steps">
                      <div>4</div>
                      Check your game after payment is completed.
                    </div>
                  </div>        
                </div>
                <div className="game-card">
                    <div className="heading">Step 1: Enter Details
                        {!['genshin impact', 'pubg mobile(global)', 'honkai: star rail', 'honor of kings'].includes(product?.name?.toLowerCase()) && 
                            <svg data-bs-toggle="modal" data-bs-target="#IdHelpModal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z"/></svg>
                        }
                    </div>

                    {product?.apiName === "smileOne" ||
                    (product?.apiName === "moogold" &&
                        product?.gameName === "15145") ||
                    product?.gameName === "2362359" ||
                    product?.gameName === "4690648" ||
                    product?.gameName === "5846232" ||
                    product?.gameName === "6637539" ||
                    product?.gameName === "8957883" ||
                    product?.gameName === "8996566" ||
                    product?.gameName === "10874415" ? (
                        <>
                            <div className="user-info-input">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><line x1="152" y1="112" x2="192" y2="112" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="152" y1="144" x2="192" y2="144" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="96" cy="120" r="24" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M64,168c3.55-13.8,17.09-24,32-24s28.46,10.19,32,24" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                              <input
                                  type="text"
                                  name="userId"
                                  placeholder="User ID"
                                  onChange={(e) => setUserId(e.target.value)}
                                  value={userId}
                              />
                            </div>
                            <div className="user-info-input">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="128" r="96" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="37.46" y1="96" x2="218.54" y2="96" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="37.46" y1="160" x2="218.54" y2="160" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                              <input
                                  type="text"
                                  name="zoneid"
                                  placeholder="ZONE ID"
                                  onChange={(e) => setZoneId(e.target.value)}
                                  value={zoneId}
                              />
                            </div>

                            {playerCheck ?(
                              <div className="verified-info">
                                <div className="label">Username:</div>
                                <div className="verfied-username"> {playerCheck} </div>
                                <button onClick={handleCheckPlayer}>
                                  Update
                                  {loading && (
                                      <div class="spinner-grow spinner-grow-sm" role="status">
                                          <span class="visually-hidden">Loading...</span>
                                      </div>
                                  )}
                                </button>
                              </div>
                            ):
                            (
                              <button className="p-check-btn" onClick={handleCheckPlayer}>
                                Check
                                {loading && (
                                    <div class="spinner-grow spinner-grow-sm" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                )}
                              </button>
                            )}

                            <span className="text-danger">
                                {error &&
                                    "First Check your username by clicking check button"}
                            </span>
                        </>
                    ) : product?.apiName === "moogold" &&
                      (product?.gameName === "428075" ||
                          product?.gameName === "4233885" ||
                          product?.gameName === "9477186") ? (
                        <>
                            <div className="user-info-input">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><line x1="152" y1="112" x2="192" y2="112" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="152" y1="144" x2="192" y2="144" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="96" cy="120" r="24" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M64,168c3.55-13.8,17.09-24,32-24s28.46,10.19,32,24" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                                <input
                                    className="player-tag"
                                    type="text"
                                    name="userId"
                                    placeholder="USER ID"
                                    onChange={(e) => setUserId(e.target.value)}
                                    value={userId}
                                />
                            </div>
                            <div className="user-info-input">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="128" r="96" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="37.46" y1="96" x2="218.54" y2="96" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="37.46" y1="160" x2="218.54" y2="160" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                              <select
                                  name="zoneid"
                                  className=""
                                  onChange={(e) => setZoneId(e.target.value)}
                              >
                                  <option value="">Select Server</option>
                                  <option value="America">America</option>
                                  <option value="Asia">Asia</option>
                                  <option value="Europe">Europe</option>
                                  <option value="TW,HK,MO">TW, HK, MO</option>
                              </select>
                            </div>
                            <span className="text-danger">
                                {error &&
                                    "First Check your username by clicking check button"}
                            </span>
                        </>
                    ) : product?.apiName === "moogold" &&
                      (product?.gameName === "5177311" ||
                          product?.gameName === "6963" ||
                          product?.gameName === "4427073" ||
                          product?.gameName === "4427071") ? (
                        <div className="user-info-input">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><line x1="152" y1="112" x2="192" y2="112" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="152" y1="144" x2="192" y2="144" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="96" cy="120" r="24" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M64,168c3.55-13.8,17.09-24,32-24s28.46,10.19,32,24" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                            <input
                                type="text"
                                name="userId"
                                placeholder={
                                    product?.tag ? product?.tag : "Enter ID"
                                }
                                onChange={(e) => setUserId(e.target.value)}
                                value={userId}
                            />
                        </div>
                    ) : (
                      <div className="user-info-input">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><line x1="152" y1="112" x2="192" y2="112" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="152" y1="144" x2="192" y2="144" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="96" cy="120" r="24" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M64,168c3.55-13.8,17.09-24,32-24s28.46,10.19,32,24" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                        <input
                            type="text"
                            name="playerId"
                            placeholder={`${product?.tag || "Enter ID"}`}
                            onChange={(e) => setPlayerId(e.target.value)}
                            value={playerId}
                        />
                      </div>
                    )}
            
                </div>
              </div>
                {/* <div
                    className="p-info-container area loading false"
                    style={{
                        backgroundImage: getBackgroundImage(),
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="pro-img">
                        <img
                            src={`https://wurustore.in/${product?.image}`}
                            alt=""
                        />

                        <div>
                            <h2 className="m-0 loading false">
                                {product?.name}
                            </h2>
                            <h6 className="m-0 d-none d-md-none d-lg-block">
                                ⚡Instant Recharge⚡
                            </h6>
                            <div className="features">
                                <button className="loading false">
                                    <svg
                                        class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon css-vubbuv"
                                        focusable="false"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        data-testid="SupportAgentIcon"
                                    >
                                        <path d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62z"></path>
                                        <circle cx="9" cy="13" r="1"></circle>
                                        <circle cx="15" cy="13" r="1"></circle>
                                        <path d="M18 11.03C17.52 8.18 15.04 6 12.05 6c-3.03 0-6.29 2.51-6.03 6.45 2.47-1.01 4.33-3.21 4.86-5.89 1.31 2.63 4 4.44 7.12 4.47z"></path>
                                    </svg>
                                    24/7 Chat Support
                                </button>
                                <button className="loading false">
                                    <svg
                                        class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon css-vubbuv"
                                        focusable="false"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        data-testid="AssuredWorkloadIcon"
                                    >
                                        <path d="M5 10h2v7H5zm6 0h2v7h-2zm11-4L12 1 2 6v2h20zM2 19v2h12.4c-.21-.64-.32-1.31-.36-2H2zm17-6.74V10h-2v3.26zM20 14l-4 2v2.55c0 2.52 1.71 4.88 4 5.45 2.29-.57 4-2.93 4-5.45V16l-4-2zm-.72 7-2.03-2.03 1.06-1.06.97.97 2.41-2.38 1.06 1.06L19.28 21z"></path>
                                    </svg>
                                    Safe Payment
                                </button>
                                <button className="loading false">
                                    <svg
                                        class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon css-vubbuv"
                                        focusable="false"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        data-testid="VerifiedUserIcon"
                                    >
                                        <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
                                    </svg>
                                    Official Store
                                </button>
                                <button className="loading false">
                                    <svg
                                        class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon css-vubbuv"
                                        focusable="false"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        data-testid="WorkspacePremiumIcon"
                                    >
                                        <path d="M9.68 13.69 12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"></path>
                                    </svg>
                                    Service Guarantee
                                </button>
                                <button className="loading false">
                                    <svg
                                        class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon css-vubbuv"
                                        focusable="false"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        data-testid="ElectricBoltIcon"
                                    >
                                        <path d="M14.69 2.21 4.33 11.49c-.64.58-.28 1.65.58 1.73L13 14l-4.85 6.76c-.22.31-.19.74.08 1.01.3.3.77.31 1.08.02l10.36-9.28c.64-.58.28-1.65-.58-1.73L11 10l4.85-6.76c.22-.31.19-.74-.08-1.01-.3-.3-.77-.31-1.08-.02z"></path>
                                    </svg>
                                    Instant Delivery
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
            
            <div className="package-details ">

                <div className="package-tab-container mb-4">
                    <div className="tab-title">Step 2: Choose the package</div>
                    <div className="tab-container">
                        {product?.tabs?.length === 1 ? (
                            <>
                                {product?.tabs?.map((tab, index) => {
                                    return (
                                        <div
                                            className={`tab-card ${
                                                currentTab === tab?.name &&
                                                "tab-active"
                                            }`}
                                            onClick={() => {
                                                setCurrentTab(tab.name);
                                            }}
                                        >
                                            <img
                                                className="tab-img-top"
                                                src={`https://wurustore.in/${tab.image}`}
                                                alt="Tab image"
                                            />
                                            <div className="tab-body">
                                                <p className="tab-text">
                                                    {tab.name}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {product?.tabs?.slice(1).map((tab, index) => {
                                    return (
                                        <div
                                            className={`tab-card ${
                                                currentTab === tab?.name &&
                                                "tab-active"
                                            }`}
                                            onClick={() => {
                                                setCurrentTab(tab.name);
                                            }}
                                        >
                                            <img
                                                className="tab-img-top"
                                                src={`https://wurustore.in/${tab.image}`}
                                                alt="Tab image"
                                            />
                                            <div className="tab-body">
                                                <p className="tab-text">
                                                    {tab.name}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>

                <div className="package-container">
                    {product?.tabs?.length === 1 ? (
                        <>
                            {product?.cost?.map((item, index) => {
                                return (
                                    <div
                                        onClick={() => {
                                            setAmount(item.amount);
                                            setPriceAndId(item.amount);
                                        }}
                                        key={index}
                                        className={`item-container ${
                                            amount === item?.amount && "active"
                                        }`}
                                    >
                                        <ItemCard {...item} />
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            {product?.cost?.map((costItem, index) => {
                                return (
                                    <>
                                        {costItem?.tabName === currentTab && (
                                            <div
                                                onClick={() => {
                                                    setAmount(costItem.amount);
                                                    setPriceAndId(
                                                        costItem.amount
                                                    );
                                                }}
                                                key={index}
                                                className={`item-container ${
                                                    amount ===
                                                        costItem?.amount &&
                                                    "active"
                                                }`}
                                            >
                                                <ItemCard {...costItem} />
                                            </div>
                                        )}
                                    </>
                                );
                            })}
                        </>
                    )}
                </div>

                <div className="checkout-container">
                    <div className="mt-4 pack-info">
                        <div className="title">
                            <span>Payment Mode</span>
                        </div>
                        <div className="payment">
                            <div
                                onClick={() => setMode("UPI")}
                                className={`upi ${mode === "UPI" && "active"}`}
                            >
                                {/* <img src={IMAGES.upi} alt="" /> */}
                                <h4 className="m-0">UPI</h4>
                            </div>
                            {/* <div
      onClick={() => setMode("WALLET")}
      className={`wallet ${mode === "WALLET" && "active"}`}
    >
      <div>
        <AccountBalanceWalletIcon className="icon" />
        <span className="ms-2">{user && <b>Rs. {balance}</b>}</span>
      </div>
      <h4 className="m-0">Wallet</h4>
    </div> */}
                        </div>
                    </div>

                    <div className="mt-4 pack-info">
                        <div className="title">
                            <span>Total</span>
                            <div className="price ">
                                {selectedPrice !== null ? (
                                    <h3 className="m-0 mt-3">
                                        <b>Rs. {selectedPrice}</b>
                                    </h3>
                                ) : (
                                    "Select an amount to see the price"
                                )}
                            </div>
                        </div>
                        {!user ? (
                            <button
                                className="p-check-btn"
                                onClick={() => navigate("/login")}
                            >
                                Please Login First
                            </button>
                        ) : product?.stock === "No" ? (
                            <button
                                className="p-check-btn"
                                style={{ opacity: "0.7" }}
                            >
                                Out of Stock
                            </button>
                        ) : product?.apiName === "moogold" &&
                          (product?.gameName === "428075" ||
                              product?.gameName === "9477186" ||
                              product?.gameName === "4427071" ||
                              product?.gameName === "6963" ||
                              product?.gameName === "4233885" ||
                              product?.gameName === "4427073" ||
                              product?.gameName === "5177311") ? (
                            <button
                                disabled={loader}
                                onClick={checkPlaceOrder}
                                className="p-check-btn"
                            >
                                Buy Now
                                {loader && (
                                    <div
                                        class="ms-2 spinner-grow spinner-grow-sm"
                                        role="status"
                                    >
                                        <span class="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </button>
                        ) : product?.api === "no" ? (
                            <button
                                disabled={loader}
                                onClick={checkPlaceOrder}
                                className="p-check-btn"
                            >
                                Buy Now
                                {loader && (
                                    <div
                                        class="ms-2 spinner-grow spinner-grow-sm"
                                        role="status"
                                    >
                                        <span class="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </button>
                        ) : playerCheck === null ? (
                            ""
                        ) : (
                            <button
                                disabled={loader}
                                onClick={checkPlaceOrder}
                                className="p-check-btn"
                            >
                                Buy Now
                                {loader && (
                                    <div
                                        class="ms-2 spinner-grow spinner-grow-sm"
                                        role="status"
                                    >
                                        <span class="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </button>
                        )}
                    </div>

                    <div className="my-4  text-light">
                        <span>{product?.desc}</span>
                    </div>
                </div>

                {/* <div className="package-container">
          {product?.cost?.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setAmount(item.amount);
                  setPriceAndId(item.amount);
                }}
                key={index}
                className={`item-container ${
                  amount === item?.amount && "active"
                }`}
              >
                <ItemCard {...item} />
              </div>
            );
          })}
        <div className="order-info">
          {/* USER ID ZONE ID */}
            </div>

            {/* ================================= FIELDS  */}
            {/* ================================= FIELDS  */}
            {/* ================================= FIELDS  */}
            </div>

            <div class="modal fade mlbb-help-modal" id="IdHelpModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title" id="exampleModalLabel">MLBB User ID & Zone ID</div>
                        <svg className="modal-close" data-bs-dismiss="modal" aria-label="Close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><line x1="200" y1="56" x2="56" y2="200" fill="none" stroke="inherit" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="200" x2="56" y2="56" fill="none" stroke="inherit" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    </div>
                    
                    <img src={mlbbHelpImage} alt="" />
                </div>
            </div>
            </div>

        </Layout>
    );
};

export default ProductInfo;

const ProductTabList = (props) => {
    props?.tabs?.forEach((tab) => {
        if ((tab.name = "all")) {
            props?.cost?.forEach((item) => {
                console.log(item);
                return (
                    <div className={`item-container`}>
                        <ItemCard {...item} />
                        hello
                    </div>
                );
            });
        }
    });
};

{
    /* <div className="package-container">
{product?.cost?.map((item, index) => {
  return (
    <div onClick={() => { setAmount(item.amount); setPriceAndId(item.amount);}} key={index} className={`item-container ${amount === item?.amount && "active"}`}>
       <ItemCard {...item} />
    </div>
  );
})}
</div> */
}