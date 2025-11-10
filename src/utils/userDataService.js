import axios from "axios";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { AppUrl } from "./appData";

const getUserData = async (dispatch, setUser, setbalance) => {
  try {
    const res = await axios.post(
      AppUrl + "/api/user/getUserData",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (res.data.success) {
      const { user, id, key: encryptedKey, iv: encryptedIv } = res.data.data;
      const key = CryptoJS.enc.Hex.parse(encryptedKey);
      const iv = CryptoJS.enc.Hex.parse(encryptedIv);
      const decryptedBalance = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Hex.parse(id) },
        key,
        { iv: iv }
      ).toString(CryptoJS.enc.Utf8);
      setbalance(decryptedBalance);
      if (setUser === null) {
        dispatch(setUser(null));
      } else {
        dispatch(setUser(user));
      }
    } else {
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.log(error);
  }
};

export default getUserData;
