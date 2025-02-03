import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import FortgotPassword from "../pages/Forgot-Password/ForgotPassword";
import StudentList from "../pages/StudentList/StudentList";

export default function MainRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={Login}></Route>
        <Route path="/forgot-password" element={FortgotPassword}></Route>
        <Route path="/studentlist" element={StudentList}></Route>
      </Routes>
    </div>
  );
}
