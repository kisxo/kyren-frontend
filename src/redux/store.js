import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { modalSlice } from "./modal/modalSlice";
import { productsSlice } from "./features/productsSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    products: productsSlice.reducer,
  },
});
