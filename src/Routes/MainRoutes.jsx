import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import FortgotPassword from "../pages/Forgot-Password/ForgotPassword";
import Home from "../pages/Home/Home";
import AlunoDashboard from "../pages/AlunoDashboard/AlunoDashboard";
import Profile from "../pages/Profile/Profile";
import PageError from "../pages/PageError/PageError";
import ListaUsuarios from "../pages/ListaUsuarios/ListaUsuarios";
import StudentList from "../pages/StudentList/StudentList";
import RegisterForm from "../pages/Register-Form/RegisterForm";
import UsersManagement from "../pages/UsersManagement/UsersManagement";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="*" element={<PageError />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<FortgotPassword />} />
      <Route path="/dashboard" element={<AlunoDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/lista-usuarios" element={<ListaUsuarios />} />
      <Route path="/studentlist" element={<StudentList />}></Route>
      <Route path="/register-form" element={<RegisterForm />} />
      <Route path="/usersmanagement" element={<UsersManagement />} />
    </Routes>
  );
}
