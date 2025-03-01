import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import AlunoDashboard from "../pages/AlunoDashboard/AlunoDashboard";
import Profile from "../pages/Profile/Profile";
import ListaUsuarios from "../pages/ListaUsuarios/ListaUsuarios";
import StudentList from "../pages/StudentList/StudentList";
import RegisterForm from "../pages/Register-Form/RegisterForm";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import ExerciseForm from "../pages/Edit-Exercise/EditExercise";

export default function AppRoutes() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        console.log("isAuthenticated", isAuthenticated);
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={<AlunoDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user-list" element={<ListaUsuarios />} />
            <Route path="/studentlist" element={<ExerciseForm />}>
                {/* <Route path="/edit"></Route> */}
            </Route>
            <Route path="/register-form" element={<RegisterForm />} />
        </Routes>
    );
}
