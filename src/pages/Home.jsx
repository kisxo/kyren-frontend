import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice.js";
import { message } from "antd";
import Layout from "../components/Layout/Layout.jsx";
import HeroSection from "../components/Home/HeroSection.jsx";
import axios from "axios";
import Games from "../components/Games.jsx";
import getUserData from "../utils/userDataService.js";
// import "./Home.css";
import { AppUrl } from "../utils/appData.js";
import NotificationSlider from "../components/ NotificationSlider.jsx";
import QuickActions from "../components/Home/QuickActions.jsx";

const Home = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [display, setDisplay] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getUserData(dispatch, setUser, null);
  }, []);

  async function getNoti() {
    try {
      const res = await axios.get(AppUrl + "/api/noti/get-noti");
      if (res.data.success) {
        setImage(res.data.data[0].image);
        setLink(res.data.data[0].link);
        setDisplay(res.data.data[0].display);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 5000);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want quit?";
      localStorage.setItem("giveaway", "true");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem("giveaway", "false");
  };

  const banners = [
  "https://wurustore.in/media/banner/banner-1.jpeg",
  "https://wurustore.in/media/banner/banner-2.jpeg",
  "https://wurustore.in/media/banner/banner-3.jpeg",
  "https://wurustore.in/media/banner/banner-4.jpeg",
  "https://wurustore.in/media/banner/banner-5.jpeg"
];

  return (
    <Layout>
      <HeroSection images={banners}/>
      <QuickActions />
      <Games productsList={props.productsList} title={"Popular Games Top-Up"} />
    </Layout>
  );
};

export default Home;
