/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import ProfileLayout from "../layouts/ProfileLayout";

import CategoryManagement from "../pages/admin/Category";
import ProductManagement from "../pages/admin/Product";
import TypeManagement from "../pages/admin/Type";
import OrderManagement from "../pages/admin/Order";
import Dashboard from "../pages/admin";
import ReviewManagement from "../pages/admin/Review";
import UserManagement from "../pages/admin/User";

import HomePage from "../pages/user/HomePage";
import ProductList from "../pages/user/ProductList";
import ProductDetail from "../pages/user/ProductDetail";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";

import UserInfoPage from "../pages/user/UserInfo";
import Favorite from "../pages/user/Favorite";
import ChangePassword from "../pages/user/ChangePassword";
import OrderHistory from "../pages/user/OrderHistory";

import Register from "../pages/Register";
import Login from "../pages/Login";
import ActiveEmail from "../pages/Active";
import ForgotPassword from "../pages/ForgotPassword";
import NewPassword from "../pages/NewPassword";

import { ROUTES } from "../constants/routes";
import { getUserInfoRequest } from "../redux/slicers/auth.slice";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      dispatch(getUserInfoRequest({ id: parseInt(tokenData.sub) }));
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN.CATEGORY_LIST} element={<CategoryManagement />} />
        <Route path={ROUTES.ADMIN.PRODUCT_LIST} element={<ProductManagement />} />
        <Route path={ROUTES.ADMIN.TYPE_LIST} element={<TypeManagement />} />
        <Route path={ROUTES.ADMIN.ORDER_MANAGE} element={<OrderManagement />} />
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.ADMIN.COMMENT_MANAGE} element={<ReviewManagement />} />
        <Route path={ROUTES.ADMIN.USER_MANAGE} element={<UserManagement />} />
      </Route>
      <Route element={<UserLayout />}>
        <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductList />} />
        <Route path={ROUTES.USER.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={ROUTES.USER.CART} element={<Cart />} />
        <Route path={ROUTES.USER.CHECKOUT} element={<Checkout />} />
        <Route element={<ProfileLayout />}>
          <Route path={ROUTES.USER.PROFILE} element={<Navigate to={ROUTES.USER.USER_INFO} />} />
          <Route path={ROUTES.USER.USER_INFO} element={<UserInfoPage />} />
          <Route path={ROUTES.USER.FAVORITE_PRODUCTS} element={<Favorite />} />
          <Route path={ROUTES.USER.CHANGE_PASSWORD} element={<ChangePassword />} />
          <Route path={ROUTES.USER.ORDER_HISTORY} element={<OrderHistory />} />
        </Route>
      </Route>

      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.ACTIVE} element={<ActiveEmail />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.NEW_PASSWORD} element={<NewPassword />} />
    </Routes>
  );
}

export default App;
