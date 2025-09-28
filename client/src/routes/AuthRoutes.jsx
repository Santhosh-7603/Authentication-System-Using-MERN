import Login from "../Components/auth/Login/LoginValidation";
import Register from "../Components/auth/Register/RegisterValidation";
import VerifyOtp from "../Components/auth/VerifyOtp";
import { Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="verify-otp" element={<VerifyOtp />} />
    </Routes>
  );
};

export default AuthRoutes;
