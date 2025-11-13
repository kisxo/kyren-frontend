import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router";
import { message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import getUserData from "../utils/userDataService";
import { setUser } from "../redux/features/userSlice";
import "./ProductInfo.css";
import { ApiUrl } from "../utils/appData";
import ItemCard from "../components/ItemCard";
import { AppUrl } from "../utils/appData";
import mlbbHelpImage from "../img/help/mlbbHelp.png";
import { Wallet } from "lucide-react";

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
    const [paymentMethod, setPaymentMethod] = useState("UPI");

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

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

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
            const res = await axios.post(
                AppUrl + "/api/payment/get-role",
                object
            );
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
                if (paymentMethod === "UPI") {
                    handleSmileOneUpiOrder(e);
                } else {
                    handleSmileOneWalletOrder(e);
                }
            } else if (product?.apiName === "moogold") {
                if (paymentMethod === "UPI") {
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
                callback_url:
                    AppUrl +
                    `/api/payment/check-api-upi-order?orderId=${orderId}`,
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
                callback_url:
                    AppUrl +
                    `/api/moogold/check-moogold-upi-order?orderId=${orderId}`,
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
            <div className="product-page-wrapper" id="verify-game-id">
                <div className="game-box mb-5">
                    <div className="game-banner">
                        <div className="info">
                            <img
                                src={AppUrl + `/${product?.image}`}
                                className=""
                            />
                            <div className="name">{product.name}</div>
                        </div>
                        <div className="instructions">
                            <div className="heading">EASY STEPS TO FOLLOW</div>
                            <div className="steps">
                                <div>1</div>
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
                        <div className="heading">
                            Step 1: Enter Details
                            {![
                                "genshin impact",
                                "pubg mobile(global)",
                                "honkai: star rail",
                                "honor of kings",
                            ].includes(product?.name?.toLowerCase()) && (
                                <svg
                                    data-bs-toggle="modal"
                                    data-bs-target="#IdHelpModal"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 256"
                                >
                                    <rect
                                        width="256"
                                        height="256"
                                        fill="none"
                                    />
                                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z" />
                                </svg>
                            )}
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
                    product?.gameName === "10874415" ?  (
                            <>
                                <div className="user-info-input bg-neutral-50">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 256 256"
                                    >
                                        <line
                                            x1="152"
                                            y1="112"
                                            x2="192"
                                            y2="112"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <line
                                            x1="152"
                                            y1="144"
                                            x2="192"
                                            y2="144"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <rect
                                            x="32"
                                            y="48"
                                            width="192"
                                            height="160"
                                            rx="8"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <circle
                                            cx="96"
                                            cy="120"
                                            r="24"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <path
                                            d="M64,168c3.55-13.8,17.09-24,32-24s28.46,10.19,32,24"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        name="userId"
                                        placeholder="User ID"
                                        onChange={(e) =>
                                            setUserId(e.target.value)
                                        }
                                        value={userId}
                                    />
                                </div>
                                <div className="user-info-input bg-neutral-50">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 256 256"
                                    >
                                        <circle
                                            cx="128"
                                            cy="128"
                                            r="96"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <path
                                            d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <line
                                            x1="37.46"
                                            y1="96"
                                            x2="218.54"
                                            y2="96"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <line
                                            x1="37.46"
                                            y1="160"
                                            x2="218.54"
                                            y2="160"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        name="zoneid"
                                        placeholder="ZONE ID"
                                        onChange={(e) =>
                                            setZoneId(e.target.value)
                                        }
                                        value={zoneId}
                                    />
                                </div>

                                {playerCheck ? (
                                    <div className="verified-info bg-neutral-100">
                                        <div className="label">Username:</div>
                                        <div className="verfied-username">
                                            {" "}
                                            {playerCheck}{" "}
                                        </div>
                                        <button onClick={handleCheckPlayer}>
                                            Update
                                            {loading && (
                                                <div
                                                    class="spinner-grow spinner-grow-sm"
                                                    role="status"
                                                >
                                                    <span class="visually-hidden">
                                                        Loading...
                                                    </span>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="p-check-btn"
                                        onClick={handleCheckPlayer}
                                    >
                                        Check
                                        {loading && (
                                            <div
                                                class="spinner-grow spinner-grow-sm"
                                                role="status"
                                            >
                                                <span class="visually-hidden">
                                                    Loading...
                                                </span>
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 256 256"
                                    >
                                        <line
                                            x1="152"
                                            y1="112"
                                            x2="192"
                                            y2="112"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <line
                                            x1="152"
                                            y1="144"
                                            x2="192"
                                            y2="144"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <rect
                                            x="32"
                                            y="48"
                                            width="192"
                                            height="160"
                                            rx="8"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <circle
                                            cx="96"
                                            cy="120"
                                            r="24"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <path
                                            d="M64,168c3.55-13.8,17.09-24,32-24s28.46,10.19,32,24"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                    </svg>
                                    <input
                                        className="player-tag"
                                        type="text"
                                        name="userId"
                                        placeholder="USER ID"
                                        onChange={(e) =>
                                            setUserId(e.target.value)
                                        }
                                        value={userId}
                                    />
                                </div>
                                <div className="user-info-input">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 256 256"
                                    >
                                        <circle
                                            cx="128"
                                            cy="128"
                                            r="96"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <path
                                            d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <line
                                            x1="37.46"
                                            y1="96"
                                            x2="218.54"
                                            y2="96"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                        <line
                                            x1="37.46"
                                            y1="160"
                                            x2="218.54"
                                            y2="160"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="16"
                                        />
                                    </svg>
                                    <select
                                        name="zoneid"
                                        className=""
                                        onChange={(e) =>
                                            setZoneId(e.target.value)
                                        }
                                    >
                                        <option value="">Select Server</option>
                                        <option value="America">America</option>
                                        <option value="Asia">Asia</option>
                                        <option value="Europe">Europe</option>
                                        <option value="TW,HK,MO">
                                            TW, HK, MO
                                        </option>
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 256"
                                >
                                    <line
                                        x1="152"
                                        y1="112"
                                        x2="192"
                                        y2="112"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="16"
                                    />
                                    <line
                                        x1="152"
                                        y1="144"
                                        x2="192"
                                        y2="144"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="16"
                                    />
                                    <rect
                                        x="32"
                                        y="48"
                                        width="192"
                                        height="160"
                                        rx="8"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="16"
                                    />
                                    <circle
                                        cx="96"
                                        cy="120"
                                        r="24"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="16"
                                    />
                                    <path
                                        d="M64,168c3.55-13.8,17.09-24,32-24s28.46,10.19,32,24"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="16"
                                    />
                                </svg>
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 256"
                                >
                                    <line
                                        x1="152"
                                        y1="112"
                                        x2="192"
                                        y2="112"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="16"
                                    />
                                    <line
                                        x1="152"
                                        y1="144"
                                        x2="192"
                                        y2="144"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="16"
                                    />
                                    <rect
                                        x="32"
                                        y="48"
                                        width="192"
                                        height="160"
                                        rx="8"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="16"
                                    />
                                    <circle
                                        cx="96"
                                        cy="120"
                                        r="24"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="16"
                                    />
                                    <path
                                        d="M64,168c3.55-13.8,17.09-24,32-24s28.46,10.19,32,24"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="16"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    name="playerId"
                                    placeholder={`${
                                        product?.tag || "Enter ID"
                                    }`}
                                    onChange={(e) =>
                                        setPlayerId(e.target.value)
                                    }
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
                        <div className="tab-title">
                            Step 2: Choose the package
                        </div>
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
                                    {product?.tabs
                                        ?.slice(1)
                                        .map((tab, index) => {
                                            return (
                                                <div
                                                    className={`tab-card ${
                                                        currentTab ===
                                                            tab?.name &&
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
                                                amount === item?.amount &&
                                                "active"
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
                                            {costItem?.tabName ===
                                                currentTab && (
                                                <div
                                                    onClick={() => {
                                                        setAmount(
                                                            costItem.amount
                                                        );
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

                    {/* Custom payment method */}
                    <div className="rounded-lg shadow w-full flex flex-col items-center justify-center gap-2 bg-neutral-900 p-4 my-4">
                        <p className="font-semibold text-center py-2">
                            Please select a payment method {paymentMethod}
                        </p>
                        {/* <p className="text-[10px] self-start text-wrap text-gray-500 pb-1">
                            This component is made by using
                            <span className="font-bold underline">
                                `:has() pseudo-class`
                            </span>
                        </p> */}

                        <label className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-neutral-800 bg-neutral-800/20 has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:bg-white/95 has-[:checked]:font-bold hover:bg-slate-200 hover:text-neutral-800 transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&_p]:has-[:checked]:translate-y-0 [&_p]:has-[:checked]:transition-transform [&_p]:has-[:checked]:duration-500 [&_p]:has-[:checked]:opacity-100 overflow-hidden">
                            <div className="inline-flex items-center justify-center gap-2 relative z-10">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 333334 199007"
                                    shape-rendering="geometricPrecision"
                                    text-rendering="geometricPrecision"
                                    image-rendering="optimizeQuality"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    height={32}
                                    width={32}
                                >
                                    <path
                                        d="M44732 130924h1856l-1738 7215c-265 1061-206 1885 147 2415 354 530 1001 795 1973 795 942 0 1737-265 2356-795 618-531 1031-1355 1296-2415l1737-7215h1885l-1767 7392c-383 1590-1060 2798-2061 3593-972 795-2268 1208-3858 1208s-2680-383-3269-1179c-589-795-707-2002-324-3592l1767-7421zm223507 11868l2826-11868h6449l-383 1649h-4564l-706 2974h4564l-413 1679h-4564l-913 3827h4565l-412 1738h-6449zm-177-8982c-413-470-913-824-1443-1031-531-235-1119-353-1797-353-1266 0-2385 412-3386 1237s-1649 1915-1973 3239c-295 1267-177 2327 413 3181 559 824 1442 1237 2620 1237 677 0 1355-118 2031-383 678-235 1356-619 2062-1119l-530 2179c-589 382-1207 648-1856 825-648 176-1296 265-2002 265-883 0-1679-148-2356-443-678-294-1236-736-1679-1324-441-560-706-1237-824-2002-117-766-88-1590 148-2474 206-883 559-1680 1031-2445 471-766 1089-1443 1796-2002 706-589 1472-1030 2297-1325 824-294 1648-441 2503-441 677 0 1295 88 1885 294 559 207 1089 500 1560 913l-500 1972zm-18317 4300h3209l-530-2710c-29-176-59-383-59-589-30-235-30-471-30-736-118 265-235 500-383 736-118 235-235 442-353 619l-1855 2680zm4093 4682l-589-3062h-4594l-2062 3062h-1972l8539-12338 2650 12338h-1972zm-15548 0l2827-11868h6449l-383 1649h-4565l-706 2945h4563l-412 1679h-4564l-1325 5565h-1885v30zm-5566-6832h353c1001 0 1679-118 2062-354 382-236 648-648 795-1267 146-648 88-1119-207-1384-293-265-913-413-1855-413h-354l-795 3417zm-471 1502l-1267 5300h-1767l2828-11867h2621c766 0 1354 59 1737 148 411 89 736 265 971 500 295 295 471 648 559 1119 89 443 59 943-59 1502-235 943-619 1709-1207 2238-589 530-1326 854-2209 972l2680 5387h-2121l-2562-5300h-206zm-11632 5330l2828-11868h6478l-382 1649h-4565l-706 2974h4564l-411 1679h-4565l-912 3827h4564l-413 1738h-6479zm-2031-10248l-2444 10218h-1884l2444-10218h-3063l383-1649h8010l-382 1649h-3063zm-19170 10248l2945-12338 5595 7244c148 206 294 413 441 648s295 501 471 794l1974-8216h1737l-2945 12310-5713-7392c-147-206-295-412-441-619-147-235-265-442-354-707l-1972 8245h-1737v30zm-4594 0l2827-11868h1884l-2827 11868h-1884zm-13870-2385l1678-707c29 530 176 942 501 1207 324 265 765 413 1354 413 559 0 1031-148 1443-471 412-324 678-736 795-1266 177-707-235-1326-1236-1855-147-89-235-148-325-177-1119-648-1825-1207-2120-1737-294-530-354-1149-176-1884 235-972 736-1738 1530-2356 796-589 1679-913 2740-913 854 0 1530 177 2031 500 501 325 766 825 854 1444l-1648 766c-148-383-325-648-560-825-235-176-530-265-884-265-501 0-942 147-1295 412-354 265-589 619-707 1090-176 707 325 1383 1472 2002 89 59 147 89 207 117 1001 530 1678 1061 1972 1591 295 529 354 1148 178 1943-266 1119-825 2002-1680 2680-853 647-1855 1002-3033 1002-971 0-1737-237-2267-708-589-471-854-1149-824-2002zm-1973-7863l-2444 10218h-1884l2444-10218h-3062l381-1649h8010l-383 1649h-3062zm-19170 10248l2944-12338 5596 7244c147 206 295 413 442 648 146 235 294 501 471 794l1973-8216h1737l-2944 12310-5713-7392c-148-206-294-412-442-619-147-235-265-442-353-707l-1973 8245h-1737v30zm-8599 0l2827-11868h6449l-383 1649h-4564l-707 2974h4564l-412 1679h-4564l-913 3827h4565l-413 1738h-6449zm-3121-5860c0-88 29-354 88-766 30-353 59-618 89-854-118 266-236 530-383 824-147 266-324 560-530 825l-4535 6331-1472-6448c-59-265-118-530-148-766-29-235-59-500-59-736-59 236-147 500-235 794-89 266-206 560-354 855l-2650 5831h-1737l5683-12368 1620 7479c29 118 59 324 89 589 29 266 88 619 147 1031 206-353 471-765 825-1296 88-146 176-235 206-324l5124-7479-177 12368h-1737l148-5890zm-17933 5860l1296-5418-2356-6420h1972l1472 4035c30 117 59 235 118 411 59 178 89 354 147 530 118-176 236-353 354-530 118-176 236-324 353-471l3446-3975h1884l-5506 6390-1296 5417h-1885v30zm-8746-4682h3209l-530-2710c-30-176-59-383-59-589-30-235-30-471-30-736-118 265-236 500-383 736-118 235-235 442-354 619l-1855 2680zm4063 4682l-589-3062h-4594l-2061 3062h-1973l8540-12338 2650 12338h-1973zm-11808-6920h471c1031 0 1767-118 2179-354 412-235 677-647 825-1237 146-618 58-1089-236-1324-324-265-972-383-1943-383h-471l-825 3299zm-501 1590l-1266 5330h-1767l2827-11868h2856c854 0 1443 59 1826 147s678 236 913 471c294 265 500 648 589 1119 88 472 59 972-59 1531-147 560-353 1090-677 1561s-707 854-1119 1119c-353 206-736 382-1148 471-412 88-1060 148-1885 148h-1089v-30zm-17580 3563h1590c854 0 1531-59 2003-176 471-117 883-324 1266-589 530-383 972-854 1325-1443 354-560 619-1237 795-2002 176-766 235-1414 147-1972-88-561-294-1061-648-1444-265-294-589-471-1030-589-442-118-1119-176-2091-176h-1354l-2003 8392zm-2297 1767l2828-11868h2532c1649 0 2798 88 3415 265 619 177 1148 442 1561 854 530 530 884 1208 1031 2002 147 825 88 1767-147 2798-266 1060-648 1972-1178 2796-530 825-1207 1473-2002 2003-589 413-1237 678-1944 854-677 177-1708 265-3063 265h-3033v30zm-8628 0l2827-11868h6449l-383 1649h-4565l-707 2974h4565l-412 1679h-4565l-913 3827h4565l-412 1738h-6449zm-4565 0l2827-11868h1884l-2827 11868h-1885zm-8540 0l2827-11868h6449l-383 1649h-4564l-707 2945h4564l-412 1679h-4565l-1325 5565h-1885v30zm-4565 0l2827-11868h1884l-2827 11868h-1885zm-13015 0l2944-12338 5595 7244c147 206 294 413 442 648 147 235 294 501 471 794l1973-8216h1737l-2944 12310-5713-7392c-147-206-294-412-442-619-147-235-265-442-353-707l-1973 8245h-1737v30z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M233961 120588h-12927l17963-64873h12927l-17963 64873zm-107424-4064c-707 2562-3063 4358-5713 4358H54185c-1826 0-3180-619-4064-1855-883-1238-1089-2769-559-4594l16255-58541h12928l-14518 52298h51710l14517-52298h12928l-16844 60632zm100710-58777c-883-1237-2268-1855-4152-1855h-71027l-3504 12721h64608l-3769 13576h-51680v-30h-12927l-10719 38724h12927l7185-25973h58100c1826 0 3534-619 5124-1855 1590-1237 2651-2768 3151-4594l7185-25972c559-1943 383-3504-501-4741z"
                                        fill="currentColor"
                                    />
                                    <path
                                        fill="#0e8635"
                                        d="M274245 55833l16344 32510-34365 32510 4087-14747 18794-17763-8941-17785z"
                                    />
                                    <path
                                        fill="#e97208"
                                        d="M262762 55833l16343 32510-34395 32510z"
                                    />
                                    <path
                                        d="M31367 0h270601c8631 0 16474 3528 22156 9210 5683 5683 9211 13526 9211 22156v136275c0 8629-3529 16472-9211 22155-5683 5682-13526 9211-22155 9211H31368c-8629 0-16473-3528-22156-9211C3530 184114 2 176272 2 167641V31366c0-8631 3528-16474 9210-22156S22738 0 31369 0zm270601 10811H31367c-5647 0-10785 2315-14513 6043s-6043 8866-6043 14513v136275c0 5646 2315 10784 6043 14512 3729 3729 8867 6044 14513 6044h270601c5645 0 10783-2315 14512-6044 3728-3729 6044-8867 6044-14511V31368c0-5645-2315-10784-6043-14513-3728-3728-8867-6043-14513-6043z"
                                        fill="currentColor"
                                        fill-rule="nonzero"
                                    />
                                </svg>
                                <p className="font-semibold absolute inset-0 w-full whitespace-nowrap translate-y-[110%] translate-x-full top-1 left-2 transition-all duration-700 opacity-0">
                                    UPI
                                </p>
                            </div>
                            <input
                                className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                                defaultValue="UPI"
                                name="payment"
                                type="radio"
                                onChange={handlePaymentMethodChange}
                                checked={paymentMethod === "UPI"}
                            />
                        </label>
                        <label className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-neutral-800 bg-neutral-800/20 has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:bg-white/95 has-[:checked]:font-bold hover:bg-slate-200 hover:text-neutral-800 transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&_p]:has-[:checked]:translate-y-0 [&_p]:has-[:checked]:transition-transform [&_p]:has-[:checked]:duration-500 [&_p]:has-[:checked]:opacity-100 overflow-hidden">
                            <div className="inline-flex items-center justify-center gap-2 relative z-10">
                                <Wallet
                                    height={32}
                                    width={32}
                                    color="currentColor"
                                    className="stroke-1"
                                />
                                <p className="font-semibold absolute inset-0 w-full whitespace-nowrap translate-y-[110%] translate-x-full top-1 left-2 transition-all duration-700 opacity-0">
                                    Wallet
                                </p>
                            </div>
                            <div className="text-neutral-500 text-xs">
                                Coming soon
                                <span className="ms-2">
                                    {/* {user && <b>Rs. {balance}</b>} */}
                                </span>
                            </div>
                            <input
                                className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                                defaultValue="WALLET"
                                name="payment"
                                type="radio"
                                disabled
                                onChange={handlePaymentMethodChange}
                                checked={paymentMethod === "WALLET"}
                            />
                        </label>
                        <label className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-neutral-800 bg-neutral-800/20 has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:bg-white/95 has-[:checked]:font-bold hover:bg-slate-200 hover:text-neutral-800 transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&_p]:has-[:checked]:translate-y-0 [&_p]:has-[:checked]:transition-transform [&_p]:has-[:checked]:duration-500 [&_p]:has-[:checked]:opacity-100 overflow-hidden">
                            <div className="inline-flex items-center justify-center gap-2 relative z-10">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 339.43 295.27"
                                    height={32}
                                    width={32}
                                >
                                    <path
                                        d="M62.15,1.45l-61.89,130a2.52,2.52,0,0,0,.54,2.94L167.95,294.56a2.55,2.55,0,0,0,3.53,0L338.63,134.4a2.52,2.52,0,0,0,.54-2.94l-61.89-130A2.5,2.5,0,0,0,275,0H64.45a2.5,2.5,0,0,0-2.3,1.45h0Z"
                                        fill="#50af95"
                                    />
                                    <path
                                        d="M191.19,144.8v0c-1.2.09-7.4,0.46-21.23,0.46-11,0-18.81-.33-21.55-0.46v0c-42.51-1.87-74.24-9.27-74.24-18.13s31.73-16.25,74.24-18.15v28.91c2.78,0.2,10.74.67,21.74,0.67,13.2,0,19.81-.55,21-0.66v-28.9c42.42,1.89,74.08,9.29,74.08,18.13s-31.65,16.24-74.08,18.12h0Zm0-39.25V79.68h59.2V40.23H89.21V79.68H148.4v25.86c-48.11,2.21-84.29,11.74-84.29,23.16s36.18,20.94,84.29,23.16v82.9h42.78V151.83c48-2.21,84.12-11.73,84.12-23.14s-36.09-20.93-84.12-23.15h0Zm0,0h0Z"
                                        fill="white"
                                    />
                                </svg>
                                <p className="font-semibold absolute inset-0 w-full whitespace-nowrap translate-y-[110%] translate-x-full top-1 left-2 transition-all duration-700 opacity-0">
                                    USTD
                                </p>
                            </div>
                            <div className="text-neutral-500 text-xs">
                                Coming soon
                            </div>
                            <input
                                className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                                defaultValue="USTD"
                                name="payment"
                                type="radio"
                                disabled
                                onChange={handlePaymentMethodChange}
                                checked={paymentMethod === "USTD"}
                            />
                        </label>

                        <div className="flex w-full justify-between bg-neutral-800 p-3 rounded-md mt-8">
                            <span className="">Total</span>
                            <div className="">
                                {selectedPrice !== null ? (
                                    <h3 className="">
                                        <b>Rs. {selectedPrice}</b>
                                    </h3>
                                ) : (
                                    "Select an amount to see the price"
                                )}
                            </div>
                        </div>
                        
                        <div className="flex w-full">
                            {!user ? (
                                <button
                                    className="btn btn-primary w-full"
                                    onClick={() => navigate("/login")}
                                >
                                    Please Login First
                                </button>
                            ) : product?.stock === "No" ? (
                                <button
                                    className="btn btn-primary w-full"
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
                                    className="btn btn-primary w-full"
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
                                    className="btn btn-primary w-full"
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
                                <a href="#verify-game-id"
                                    className="btn btn-primary w-full"
                                >
                                    Verify Game ID
                                </a>
                            ) : (
                                <button
                                    disabled={loader}
                                    onClick={checkPlaceOrder}
                                    className="btn btn-primary w-full"
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
                    </div>


                    <div className="p-4 text-light bg-neutral-900 rounded-xl my-4">
                            <span>{product?.desc}</span>
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

            {/* <div class="modal fade mlbb-help-modal" id="IdHelpModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title" id="exampleModalLabel">MLBB User ID & Zone ID</div>
                        <svg className="modal-close" data-bs-dismiss="modal" aria-label="Close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><line x1="200" y1="56" x2="56" y2="200" fill="none" stroke="inherit" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="200" x2="56" y2="56" fill="none" stroke="inherit" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    </div>
                    
                    <img src={mlbbHelpImage} alt="" />
                </div>
            </div>
            </div> */}
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
