import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SkeletonLayout from "./components/skeleton layout/SkeletonLayout";
import Layout from "./components/user/layout/layout";
import Dashboard from "./pages/user-view/dashboard/dashboard";
import Income from "./pages/user-view/income/income";
import Expense from "./pages/user-view/expense/expense";
import Login from "./pages/auth-view/login";
import Registration from "./pages/auth-view/registration";
import AuthLayout from "./components/auth/authLayout";
import { CheckAuth } from "./components/common/check-auth/checkAuth";
import { checkAuth } from "./store/auth/authSlice";
function App() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith("/auth");

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading && !isAuthPage) return <SkeletonLayout />;

  return (
    <>
      <Routes>
        {/* USER */}
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <Layout />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="incomes" element={<Income />} />
          <Route path="expenses" element={<Expense />} />
        </Route>
        {/* AUTH */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="/auth/login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
