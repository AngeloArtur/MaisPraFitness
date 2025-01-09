import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login/Login"
import FortgotPassword from "../pages/Forgot-Password/ForgotPassword"

export default function MainRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={Login}></Route>
        <Route path="/forgot-password" element={FortgotPassword}></Route>
      </Routes>
    </div>
  )
}
