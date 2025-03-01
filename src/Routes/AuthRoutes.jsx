import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import FortgotPassword from "../pages/Forgot-Password/ForgotPassword";
import PageError from "../pages/PageError/PageError";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home/Home";

export default function AuthRoutes() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Home/> : <Login />} />
            <Route path="*" element={<PageError />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<FortgotPassword />} />
        </Routes>
    );
}
