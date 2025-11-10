import { useNavigate } from "react-router";
import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppUrl } from "../utils/appData";
import "./GameAccounts.css"; 


const GameAccounts = () => {

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState(null);
    const [loading, setLoading] = useState(false);

    // This component can be used to display game accounts for sale
    const getAllAccounts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(AppUrl + "/api/account/get-all-accounts");
      if (res.data.success) {
        setAccounts(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAccounts();
  }, []);

    return (
        <Layout>
            <div className="game-account-container">
                <h1 className="title">Premium Game Accounts</h1>
                {/* <p className="description">Explore a variety of premium game accounts available for purchase.</p> */}
                {/* Add your game accounts content here */}

                <div className="game-selector">
                    <div className="game-selector-title">All</div>
                    <div className="game-selector-title selected-game">MLBB</div>
                    <div className="game-selector-title">BGMI</div>
                    <div className="game-selector-title">Free Fire</div>
                    <div className="game-selector-title">Genshin Impact</div>
                    <div className="game-selector-title">Clash of Clans</div>
                </div>
            </div>
        </Layout>
    )
}
export default GameAccounts;