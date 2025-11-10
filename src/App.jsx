// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import Dashboard from "./user/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import EditUser from "./admin/EditUser";
import AdminPayments from "./admin/AdminPayments";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import AdminProduct from "./admin/AdminProduct";
import AdminAddProduct from "./admin/AdminAddProduct";
import AdminEditProduct from "./admin/AdminEditProduct";
import AdminOrder from "./admin/AdminOrder";
import ProductInfo from "./pages/ProductInfo";
import Orders from "./user/Orders";
import Account from "./user/Account";
import ViewOrder from "./user/ViewOrder";
import AdminViewOrder from "./admin/AdminViewOrder";
import ProductPage from "./pages/ProductPage";

//selling accounts pages
import GameAccounts from "./pages/GameAccounts";

//admin pages
import AdminAccount from "./admin/AdminAccount";
import AdminAddAccount from "./admin/AdminAddAccount";
// import AddBanner from "./admin/AddBanner";
// import AdminEditGroups from "./admin/AdminEditGroups"
// import AdminEditTabs from "./admin/AdminEditTabs";
import { useSelector } from "react-redux";
import Leaderboard from "./pages/Leaderboard";
import Support from "./pages/Support";
import { Box, LinearProgress } from "@mui/material";
import LoadingPage from "./pages/LoadingPage";
// import Rankboosting from "./pages/Rankboosting";

function App() {
    const [loading, setLoading] = useState(true);
    const [productsList, setproductsList] = useState(
        useSelector((state) => state.products.productsList)
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
      return <LoadingPage />;
    }

    return (
        <div className="bg-animation-container">
            <BrowserRouter className="bg-green-500">
                <Routes>
                    {/* pages */}
                    <Route
                        path="/"
                        element={
                            <Home
                                className="aa"
                                productsList={productsList}
                            ></Home>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/privacy-policy"
                        element={
                            <PublicRoute>
                                <PrivacyPolicy />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/terms"
                        element={
                            <PublicRoute>
                                <Terms />
                            </PublicRoute>
                        }
                    ></Route>
                    <Route
                        path="/refund-policy"
                        element={
                            <PublicRoute>
                                <RefundPolicy />
                            </PublicRoute>
                        }
                    ></Route>
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route path="/forgot-password" element={<ForgotPass />} />
                    <Route path="/games" element={<ProductPage />} />
                    <Route
                        path="/product/:name?"
                        element={<ProductInfo productsList={productsList} />}
                    />
                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-account"
                        element={
                            <ProtectedRoute>
                                <Account />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/view-order/:orderId?"
                        element={
                            <ProtectedRoute>
                                <ViewOrder />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/terms" element={<Terms />} />
                    {/* <Route path="/rankBoost" element={<Rankboosting/>}/> */}
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/refund-policy" element={<RefundPolicy />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />

                    <Route path="/game-accounts" element={<GameAccounts />} />

                    {/* ======================== USER PAGES =============================== */}
                    {/* ========== EMAIL VERIFY */}
                    <Route
                        path="/user-dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    {/* ======================== USER PAGES =============================== */}
                    {/* ======================== ADMIN PAGES =============================== */}
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-orders"
                        element={
                            <ProtectedRoute>
                                <AdminOrder />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-view-order/:orderId?"
                        element={
                            <ProtectedRoute>
                                <AdminViewOrder />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-products"
                        element={
                            <ProtectedRoute>
                                <AdminProduct />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-accounts"
                        element={
                            <ProtectedRoute>
                                <AdminAccount />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-add-account"
                        element={
                            <ProtectedRoute>
                                <AdminAddAccount />
                            </ProtectedRoute>
                        }
                    />
                    {/* <Route
          path="/admin-add-banner"
          element={
            <ProtectedRoute>
              <AddBanner />
            </ProtectedRoute>
          }
        /> */}
                    <Route
                        path="/admin-add-product"
                        element={
                            <ProtectedRoute>
                                <AdminAddProduct />
                            </ProtectedRoute>
                        }
                    />
                    {/* <Route
          path="/admin-edit-product/:id?"
          element={
            <ProtectedRoute>
              <AdminEditProduct />
            </ProtectedRoute>
          }
        /> */}
                    {/* <Route
          path="/admin-edit-groups/:id?"
          element={
            <ProtectedRoute>
              <AdminEditGroups/>
            </ProtectedRoute>
          }
        /> */}
                    {/* <Route
          path="/admin-add-tab/:id?"
          element={
            <ProtectedRoute>
              <AdminEditTabs/>
            </ProtectedRoute>
          }
        /> */}
                    <Route
                        path="/admin-users"
                        element={
                            <ProtectedRoute>
                                <AdminUsers />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-edit-user/:id?"
                        element={
                            <ProtectedRoute>
                                <EditUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-payments"
                        element={
                            <ProtectedRoute>
                                <AdminPayments />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
