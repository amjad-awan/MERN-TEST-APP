import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage/AuthPage";
import HomePage from "../pages/HomePage/HomePage";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "../context/auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/auth" element={<AuthPage />} />

      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default memo(AppRoutes);
